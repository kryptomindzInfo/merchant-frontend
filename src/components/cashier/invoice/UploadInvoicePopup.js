import React from 'react';
import { Form, Formik } from 'formik';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import GroupSelectBox from './GroupSelectBox';
import UploadArea from '../../shared/UploadArea';
import { CONTRACT_URL, STATIC_URL } from '../../constants';

function CreateInvoicePopup(props) {
  const token = localStorage.getItem('bankLogged');
  return (
    <Popup accentedH1 close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          groupName: '',
          document_hash: '',
        }}
        onSubmit={{}}
      >
        {(formikProps) => {
          const { values, isSubmitting } = formikProps;

          return (
            <div>
              <h1>Upload Invoice</h1>
              <Form>
                <FormGroup>
                  <GroupSelectBox />
                </FormGroup>
                <FormGroup>
                  <UploadArea bgImg={`${STATIC_URL}main/pdf-icon.png`}>
                    {values.document_hash ? (
                      <a
                        className="uploadedImg"
                        href={CONTRACT_URL + values.document_hash}
                        target="_BLANK"
                      />
                    ) : (
                      ' '
                    )}
                    <div className="uploadTrigger">
                      <input type="file" id="logo" data-key="logo" />
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

export default CreateInvoicePopup;
