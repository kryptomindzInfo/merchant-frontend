import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Button from '../../Button';
import Col from '../../Col';
import FormGroup from '../../FormGroup';
import { inputBlur, inputFocus } from '../../handleInputFocus';
import Loader from '../../Loader';
import Popup from '../../Popup';
import Row from '../../Row';
import SelectInput from '../../SelectInput';
import TextInput from '../../TextInput';
import PaidInvoiceList from './PaidInvoiceList';
import PaidInvoiceDetails from './PaidInvoiceDetails';
import {
  getPaidInvoiceDetails,
  getPaidUserInvoices,
  getPaidInvoiceByCustomerCode,
} from '../../cashier/MerchantPayBills/api/PayBillsAPI';

const SearchInvoicePopup = (props) => {
  const merchant = JSON.parse(localStorage.getItem('cashierLogged')).merchant;
  const [isLoading, setLoading] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [payingInvoiceList, setPayingInvoiceList] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState({});
  const [editingInvoicePenalty, setEditingInvoicePenalty] = useState({});
  const [displayInvoiceList, setDisplayInvoiceList] = useState(false);
  const [displayInvoiceDetailForm, setDisplayInvoiceDetailForm] = useState(
    false,
  );
  const [invoiceName, setInvoiceName] = useState('');
  const [isBackButtonEnabled, setBackButtonEnabled] = useState(false);

  const handleSetEditingInvoice = (invoice, penalty) => {
    setEditingInvoicePenalty(penalty);
    setEditingInvoice(invoice);
    setDisplayInvoiceList(false);
    setBackButtonEnabled(true);
    setDisplayInvoiceDetailForm(true);
  };
  const onBack = () => {
    setDisplayInvoiceList(true);
    setBackButtonEnabled(false);
    setDisplayInvoiceDetailForm(false);
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <Popup accentedH1 bigBody close={props.close}>
          <div>
            <h1>Paid Bills</h1>
            {!displayInvoiceList && !displayInvoiceDetailForm ? (
              <Formik
                initialValues={{
                  invoiceIdOrMobile: '',
                  searchBy: 'Mobile',
                }}
                onSubmit={async (values) => {
                  if (values.searchBy === 'Mobile') {
                    getPaidUserInvoices(values.invoiceIdOrMobile).then((data) => {
                      setInvoiceList(data.list.reverse());
                      setDisplayInvoiceList(true);
                      if (data.list.length > 0) {
                        setInvoiceName(data.list[0].name);
                      }
                    });
                  } else if (values.searchBy === 'BillNumber') {
                    getPaidInvoiceDetails(
                      values.invoiceIdOrMobile,
                    ).then((data) => {
                      setInvoiceList(data.list.reverse());
                      setDisplayInvoiceList(true);
                      if (data.list.length > 0) {
                        setInvoiceName(data.list[0].name);
                      }
                    });
                  } else {
                    getPaidInvoiceByCustomerCode(
                      values.invoiceIdOrMobile,
                    ).then((data) => {
                      setInvoiceList(data.list.reverse());
                      setDisplayInvoiceList(true);
                      if (data.list.length > 0) {
                        setInvoiceName(data.list[0].name);
                      }
                    });
                  }
                }}
                validationSchema={Yup.object().shape({
                  invoiceIdOrMobile: Yup.string().required('Required'),
                })}
              >
                {(formikProps) => {
                  const { values, handleChange, handleBlur } = formikProps;
                  return (
                    <Form>
                      <Row>
                        <Col cW="20%">
                          <FormGroup>
                            <label htmlFor="searchBy" className="focused">
                              Search By
                            </label>
                            <SelectInput
                              name="searchBy"
                              onFocus={(e) => {
                                handleChange(e);
                                inputFocus(e);
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                handleChange(e);
                                inputBlur(e);
                              }}
                              value={values.searchBy}
                              onChange={handleChange}
                              required
                            >
                              <option value="Mobile">Mobile Number</option>
                              <option value="BillNumber">Bill Number</option>
                              <option value="CustomerCode">
                                Customer Code
                              </option>
                            </SelectInput>
                          </FormGroup>
                        </Col>
                        <Col cW="80%">
                          <FormGroup>
                            <label htmlFor="invoiceIdOrMobile">
                              Mobile/Invoice Id/Customer Code
                            </label>
                            <TextInput
                              type="text"
                              name="invoiceIdOrMobile"
                              onFocus={(e) => {
                                inputFocus(e);
                                handleChange(e);
                              }}
                              onBlur={(e) => {
                                inputBlur(e);
                                handleBlur(e);
                              }}
                              required
                              onChange={handleChange}
                              value={values.invoiceIdOrMobile}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <Button filledBtn>
                          {isLoading ? <Loader /> : 'Get'}
                        </Button>
                      </FormGroup>
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              ''
            )}
            {displayInvoiceList ? (
              <PaidInvoiceList
                merchant={merchant}
                invoiceList={invoiceList}
                setEditingInvoice={(value, penalty) => handleSetEditingInvoice(value, penalty)}
                close={props.close}
              />
            ) : (
              ''
            )}
            {displayInvoiceDetailForm ? (
              <PaidInvoiceDetails
                close={props.close}
                invoice={editingInvoice}
              />
            ) : (
              ''
            )}
          </div>

      </Popup>
    </div>
  );
};

export default SearchInvoicePopup;
