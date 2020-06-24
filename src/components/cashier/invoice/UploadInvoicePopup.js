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
                              setUploadInvoices(data);
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
