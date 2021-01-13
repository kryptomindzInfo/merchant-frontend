import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import UploadArea from '../../shared/UploadArea';
import {
  onCsvFileChange,
  processCsv,
  triggerCsvBrowse,
  processJson,
} from '../../cashier/api/CashierAPI';
import { uploadCustomer } from '../api/MerchantAPI';

function UploadCustomerPopup(props) {
  const [uploadCustomerList, setUploadCustomers] = useState([]);

  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          document_hash: '',
        }}
        onSubmit={async (values) => {
          // console.log(uploadCustomerList)
          const payload = {
            customers: uploadCustomerList,
          };
          await uploadCustomer(props, payload);
        }}
      >
        {(formikProps) => {
          const { values, isSubmitting, setFieldValue } = formikProps;

          return (
            <div>
              <h1>Upload Customers</h1>
              <Form>
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
                              console.log(data);
                              setUploadCustomers(data);
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
                    href="/src/assets/customer_format.csv"
                    id="pdfdown"
                  >
                    Click here to download sample Customer file
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
                      <span>Upload Customers</span>
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

export default UploadCustomerPopup;
