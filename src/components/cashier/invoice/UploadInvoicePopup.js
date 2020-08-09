import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import GroupSelectBox from './GroupSelectBox';
import UploadArea from '../../shared/UploadArea';
import {
  onCsvFileChange,
  processCsv,
  triggerCsvBrowse,
  uploadInvoice,
} from '../api/CashierAPI';

function UploadInvoicePopup(props) {
  const [uploadInvoiceList, setUploadInvoices] = useState([]);

  const restructuringInfoAcccordingToInvoiceApi = (data) => {
    const temp = [];
    data.map((value) => {
      const filterlist = temp.filter(
        (svalue, sindex) => svalue.number === value.number,
      );
      if (filterlist.length > 0) {
        const itemobj = {
          item_code: value.item_code,
          quantity: value.quantity,
          tax_code: value.tax_code,
          total_amount: value.total_amount,
        };
        const id = temp.findIndex((item) => item.number === value.number);
        temp[id].items.push(itemobj);
      } else {
        const obj = {
          number: value.number,
          customer_code: value.customer_code,
          name: value.name,
          amount: value.amount,
          due_date: value.due_date,
          bill_date: value.bill_date,
          description: value.description,
          is_created: 0,
          is_validated: 1,
          mobile: value.mobile,
          ccode: value.ccode,
          items: [
            {
              item_code: value.item_code,
              quantity: value.quantity,
              tax_code: value.tax_code,
              total_amount: value.total_amount,
            },
          ],
          bill_period: {
            start_date: value.start_date,
            end_date: value.end_date,
            period_name: value.period_name,
          },
        };
        temp.push(obj);
      }
    });
    return temp;
  };

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          group_id: props.groupId,
          document_hash: '',
        }}
        onSubmit={async (values) => {
          const payload = {
            group_id: props.groupId,
            invoices: uploadInvoiceList,
          };
          await uploadInvoice(props, payload);
        }}
      >
        {(formikProps) => {
          const { values, isSubmitting, setFieldValue } = formikProps;

          return (
            <div>
              <h1>Upload Invoice</h1>
              <Form>
                <FormGroup>
                  <GroupSelectBox groups={props.groups} />
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg="/src/assets/images/csvImage.jpg">
                    {values.document_hash ? (
                      <a className="uploadedImg" target="_BLANK" />
                    ) : (
                      ' '
                    )}
                    <div
                      className="uploadTrigger"
                      onClick={() => triggerCsvBrowse('csv')}
                    >
                      <input
                        type="file"
                        id="csv"
                        data-key="csv"
                        accept=".csv"
                        onChange={(e) => {
                          processCsv(e, (data) => {
                            if (data && data.length > 0) {
                              const finalData = restructuringInfoAcccordingToInvoiceApi(
                                data,
                              );
                              setUploadInvoices(finalData);
                              setFieldValue('document_hash', 'success', true);
                            }
                          });
                        }}
                      />
                      {!values.document_hash ? (
                        <i className="material-icons">cloud_upload</i>
                      ) : (
                        ' '
                      )}
                      <label>
                        {values.document_hash === '' ? (
                          <span>Uploaded File</span>
                        ) : (
                          <span>Change File</span>
                        )}
                        *
                      </label>
                    </div>
                  </UploadArea>
                </FormGroup>
                <FormGroup>
                  <a
                    target="_BLANK"
                    href="/src/assets/invoice_format.csv"
                    id="pdfdown"
                  >
                    Click here to download sample invoice file
                  </a>
                </FormGroup>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  filledBtn
                  marginTop="10px"
                  style={{
                    padding: '5px',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    width: '80%',
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={30} thickness={5} color="primary" />
                  ) : (
                    <span>Upload Invoice</span>
                  )}
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default UploadInvoicePopup;
