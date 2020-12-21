import React, { useEffect } from 'react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { number } from 'prop-types';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popup from '../../shared/Popup';
import FormGroup from '../../shared/FormGroup';
import Button from '../../shared/Button';
import Row from '../../shared/Row';
import Col from '../../shared/Col';
import TextInput from '../../shared/TextInput';
import InvoiceDescription from './InvoiceDescription';
import SelectInput from '../../shared/SelectInput';
import ErrorText from '../../shared/ErrorText';
import notify from '../../utils/Notify';
import Loader from '../../shared/Loader';
import {
  correctFocus,
  inputBlur,
  inputFocus,
} from '../../utils/handleInputFocus';
import {
  invoiceApi,
  createInvoice,
  createCustomer,
  getBillPeriods,
  getBillTerms,
  getCounter,
  incCounter,
} from '../api/CashierAPI';
import { currency, API_URL } from '../../constants';
import TextArea from '../../shared/TextArea';

function CreateInvoicePopup(props) {
  const [currentBillNumber, setCurrentBillNumber] = React.useState('');
  const [merchantName, setMerchantName] = React.useState(
    JSON.parse(localStorage.getItem('cashierLogged')).merchant.username.slice(
      0,
      3,
    ),
  );
  const [branchName, setBranchName] = React.useState(
    JSON.parse(localStorage.getItem('cashierLogged')).branch.username.slice(
      0,
      3,
    ),
  );
  const [cashierName, setCashierName] = React.useState(
    JSON.parse(localStorage.getItem('cashierLogged')).staff.username.slice(
      0,
      3,
    ),
  );
  const [offeringList, setOfferingList] = React.useState(props.offeringlist);
  const [taxList, setTaxList] = React.useState(props.taxlist);
  const [descList, setDescList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userLastName, setUserLastName] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');
  const [userCode, setUserCode] = React.useState('');
  const [createUser, setCreateUser] = React.useState(false);
  const [itemList, setItemList] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [defaultBillPeriod, setDefaultBillPeriod] = React.useState(
    props.defaultperiod,
  );
  const [billTermList, setBilltermList] = React.useState(props.termlist);
  const [defaultBillTerm, setDefaultBillTerm] = React.useState({});
  const [countryList, setCountryList] = React.useState(props.countrylist);
  const [defaultCountry, setDefaultCountry] = React.useState(
    props.defaultcountry,
  );
  const [totalAmountWithoutTax, setTotalAmountWithoutTax] = React.useState(0);
  const [totalTax, setTotalTax] = React.useState(0);
  const today = new Date();
  const date = `${today.getDate() + 1 < 10 ? `0${today.getDate()}` : today.getDate()
    }/${today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : today.getMonth() + 1
    }/${today.getFullYear()}`;

  const refreshCounter = async () => {
    setLoading(true);
    getCounter().then((data) => {
      const billnumber = `${merchantName}${branchName}${cashierName}${data.counter}`;
      setCurrentBillNumber(billnumber);
      // setLoading(data.loading);
    });
  };

  const dbillterm = () => {
    return props.termlist.reduce((a, b) => {
      if (b.name === props.defaultterm.name) {
        return b;
      }
    }, 0);
  };

  const addNewItem = () => {
    setItemList([
      ...itemList,
      {
        item_code: '',
        quantity: 0,
        tax_code: '',
        total_amount: 0,
      },
    ]);
  };

  const deleteItem = (index) => {
    setItemList(itemList.filter((sindex, ind) => ind !== index));
  };

  const handleItemCodeChange = (code, index) => {
    const itemL = [...itemList];
    itemL[index].item_code = code;
    setItemList(itemL);
  };

  const handleQuantityChange = (quantity, amount, index) => {
    const itemL = [...itemList];
    itemL[index].quantity = quantity;
    itemL[index].total_amount = amount;
    setItemList(itemL);
  };

  const handleTaxCodeChange = (code, amount, index) => {
    const itemL = [...itemList];
    itemL[index].tax_code = code;
    itemL[index].total_amount = amount;
    setItemList(itemL);
  };

  const handleTotalAmount = (prev, next) => {
    setTotalAmount(totalAmount - prev + next);
  };

  const handleTotalAmountWithoutTax = (prev, next) => {
    setTotalAmountWithoutTax(totalAmountWithoutTax - prev + next);
  };

  const handleTotalTax = (prev, next) => {
    setTotalTax(totalTax - prev + next);
  };

  const resteTotalAmount = () => {
    setTotalAmount(0);
  };

  const getUser = (e) => {
    if (e) {
      if (e.target.value.length === 10) {
        return new Promise((resolve, reject) => {
          axios
            .post(`${API_URL}/merchantStaff/getCustomerForMobile`, {
              mobile: e.target.value,
            })
            .then((res) => {
              if (res.data.error || res.data.status !== 1) {
                resolve(false);
                setUserName('');
                setUserEmail('');
                setUserCode('');
                setCreateUser(true);
                return false;
              }
              setUserName(res.data.customer.name);
              setUserEmail(res.data.customer.email);
              setUserCode(res.data.customer.customer_code);
              setCreateUser(false);
            })
            .catch((err) => {
              resolve(false);
            });
        });
      }
      return false;
    }
    return false;
  };

  const termNameSelectInput = () => {
    return billTermList.map((val, index) => {
      return (
        <option key={val.name} value={index}>
          {val.name}
        </option>
      );
    });
  };

  const handleSubmit2 = async (values) => {
    if (userName !== '') {
      values.name = userName;
    }
    if (userCode !== '') {
      values.customer_code = userCode;
    }
    if (props.type === 'update') {
      values.number = props.invoice.number;
    } else {
      values.number = `Draft${Math.floor(Math.random() * 1000000000)}`;
    }
    values.items = itemList;
    values.paid = 0;
    values.is_validated = 0;
    values.amount = totalAmount;
    const due = new Date();
    due.setDate(due.getDate() + billTermList[values.term].days);
    values.due_date = `${due.getDate() + 1 < 10 ? `0${due.getDate()}` : due.getDate()
      }/${due.getMonth() + 1 < 10 ? `0${due.getMonth() + 1}` : due.getMonth() + 1
      }/${due.getFullYear()}`;
    values.bill_period = defaultBillPeriod;
    values.group_id = props.groupId;
    if (props.type === 'create') {
      await createInvoice(props, values, 'draft');
    } else {
      values.invoice_id = props.invoice._id;
      values.group_id = props.groupId;
      await invoiceApi(props, values, 'update');
    }
  };

  const handleSubmit3 = async (values) => {
    await createCustomer(props, values);
    setCreateUser(false);
  };

  const countrySelectInput = () => {
    return countryList.map((val, index) => {
      return (
        <option key={val.ccode} value={index}>
          {val.ccode}
        </option>
      );
    });
  };

  const setList = () => {
    if (props.invoice.items) {
      const list = [];
      props.invoice.items.map((val) => {
        const obj = {
          name: val.item_desc.name,
          description: val.item_desc.description,
          denomination: val.item_desc.denomination,
          unitOfMeasure: val.item_desc.unit_of_measure,
          unitPrice: val.item_desc.unit_price,
          quantity: val.quantity,
          tax: val.tax_desc.value,
          amount: val.total_amount,
          amountNoTax: val.quantity * val.item_desc.unit_price,
          taxAmount: val.total_amount - val.quantity * val.item_desc.unit_price,
        };
        list.push(obj);
      });
      setDescList(list);
      // setLoading(false);
    } else {
      const list = [];
      const obj = {
        name: '',
        description: '',
        denomination: '',
        unitOfMeasure: '',
        unitPrice: 0,
        quantity: 0,
        tax: 0,
        amount: 0,
        amountNoTax: 0,
        taxAmount: 0,
      };
      list.push(obj);
      setDescList(list);
      // setLoading(false);
    }
  };

  const setList2 = () => {
    if (props.type === 'update') {
      const list = [];
      props.invoice.items.map((val) => {
        const obj = {
          item_code: val.item_desc.code,
          quantity: val.quantity,
          tax_code: val.tax_desc.code,
          total_amount: val.total_amount,
        };
        list.push(obj);
      });
      setItemList(list);
    } else {
      const list = [];
      const obj = {
        item_code: '',
        quantity: 0,
        tax_code: '',
        total_amount: 0,
      };
      list.push(obj);
      setItemList(list);
    }
  };

  const amountset = () => {
    if (props.type === 'update') {
      const total = props.invoice.items.reduce((a, b) => {
        return a + b.quantity * b.item_desc.unit_price;
      }, 0);
      setTotalAmountWithoutTax(total);
      setTotalAmount(props.invoice.amount);
      setTotalTax(props.invoice.amount - total);
    }
  };

  useEffect(() => {
    correctFocus(props.type);
    setList();
    setList2();
    amountset();
    refreshCounter();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Popup accentedH1 bigBody close={props.onClose.bind(this)}>
      <Formik
        initialValues={{
          number: props.invoice.number || '',
          name: props.invoice.name || '',
          last_name: props.invoice.last_name || '',
          address: props.invoice.address || '',
          amount: props.invoice.amount || '',
          bill_period: props.invoice.bill_period || '',
          term: props.invoice.term || Number,
          bill_date: props.invoice.bill_date || date,
          description: props.invoice.description || '',
          mobile: props.invoice.mobile || '',
          customer_code: props.invoice.customer_code || '',
          email: props.invoice.email || '',
          ccode: props.invoice.ccode || '',
          items: [],
        }}
        onSubmit={async (values) => {
          if (userName !== '') {
            values.name = userName;
          }
          if (userCode !== '') {
            values.customer_code = userCode;
          }
          if (props.mode === 'invoice') {
            values.number = `${currentBillNumber}`;
            values.amount = totalAmount;
          } else {
            values.number = `${values.number}C`;
            values.is_counter = 1;
            values.reference_invoice = props.invoice.number;
            values.amount = -totalAmount;
          }
          values.items = itemList;
          values.paid = 0;
          values.is_validated = 1;
          const due = new Date();
          due.setDate(due.getDate() + billTermList[values.term].days);
          values.due_date = `${due.getDate() + 1 < 10 ? `0${due.getDate()}` : due.getDate()
            }/${due.getMonth() + 1 < 10
              ? `0${due.getMonth() + 1}`
              : due.getMonth() + 1
            }/${due.getFullYear()}`;
          values.bill_period = defaultBillPeriod;
          values.group_id = props.groupId;
          if (props.mode === 'invoice') {
            if (props.type === 'create') {
              await createInvoice(props, values, 'invoice').then(
                async (err, data) => {
                  if (err) {
                    notify(err, 'error');
                  } else if (props.mode === 'invoice') {
                    await incCounter(props);
                  }
                },
              );
            } else {
              values.invoice_id = props.invoice._id;
              values.group_id = props.groupId;
              await invoiceApi(props, values, 'update').then(
                async (err, data) => {
                  if (err) {
                    notify(err, 'error');
                  } else if (props.mode === 'invoice') {
                    await incCounter(props);
                  }
                },
              );
            }
          } else {
            await createInvoice(props, values, 'invoice').then(
              async (err, data) => {
                if (err) {
                  notify(err, 'error');
                } else if (props.mode === 'invoice') {
                  await incCounter(props);
                }
              },
            );
          }
        }}
        validationSchema={Yup.object().shape({
          mobile: Yup.string()
            .min(10, 'number should be atleast 10 digits')
            .max(10, 'number cannot exceed 10 digits')
            .matches(
              /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              'Mobile no must be valid',
            )
            .required('Mobile no is required'),
          term: Yup.string().required('Bill Term is required'),
        })}
      >
        {(formikProps) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleFocus,
            setFieldValue,
          } = formikProps;

          return (
            <div>
              {props.mode === 'invoice' ? (
                <h1>
                  {props.type === 'update' ? 'Edit Invoice' : 'Create Invoice1'}
                </h1>
              ) : (
                  <h1>Counter Invoice</h1>
                )}
              <Form>
                {props.mode === 'invoice' ? (
                  <Row>
                    <Col cW="10%" mR="2%">
                      <FormGroup>
                        <SelectInput
                          name="ccode"
                          onFocus={(e) => {
                            handleChange(e);
                            inputFocus(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                            handleChange(e);
                            inputBlur(e);
                          }}
                          value={values.ccode}
                          onChange={handleChange}
                          required
                        >
                          {countrySelectInput()}
                        </SelectInput>
                      </FormGroup>
                    </Col>
                    <Col cW="40%">
                      <FormGroup>
                        <label className="focused">Mobile Number*</label>
                        <TextInput
                          type="text"
                          pattern="[0-9]{10}"
                          title="10 Digit numeric value"
                          name="mobile"
                          onFocus={(e) => {
                            handleChange(e);
                            inputFocus(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                            handleChange(e);
                            inputBlur(e);
                          }}
                          value={values.mobile}
                          onChange={(e) => {
                            handleChange(e);
                            getUser(e);
                          }}
                          required
                        />
                        <ErrorMessage name="mobile" component={ErrorText} />
                      </FormGroup>
                    </Col>
                    <Col cW="25%" mR="2%">
                      <FormGroup>
                        <label className="focused">Bill Number</label>
                        <TextInput
                          type="text"
                          name="number"
                          onFocus={(e) => {
                            handleChange(e);
                            inputFocus(e);
                          }}
                          onBlur={(e) => {
                            handleBlur(e);
                            handleChange(e);
                            inputBlur(e);
                          }}
                          value={currentBillNumber}
                          placeholder={currentBillNumber}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col cW="25%" mR="2%">
                      {userCode === '' ? (
                        <FormGroup>
                          <label className="focused">Customer Code*</label>
                          <TextInput
                            type="text"
                            name="customer_code"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.customer_code}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      ) : (
                          <FormGroup>
                            <label className="focused">Customer Code*</label>
                            <TextInput
                              type="text"
                              name="customer_code"
                              value={values.customer_code}
                              placeholder={userCode}
                            />
                          </FormGroup>
                        )}
                    </Col>
                  </Row>
                ) : (
                    <Row>
                      <Col cW="10%" mR="2%">
                        <FormGroup>
                          <SelectInput
                            name="ccode"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.ccode}
                            onChange={handleChange}
                            required
                            disabled
                          >
                            {countrySelectInput()}
                          </SelectInput>
                        </FormGroup>
                      </Col>
                      <Col cW="40%">
                        <FormGroup>
                          <label className="focused">Mobile Number*</label>
                          <TextInput
                            type="text"
                            pattern="[0-9]{10}"
                            title="10 Digit numeric value"
                            name="mobile"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.mobile}
                            onChange={(e) => {
                              handleChange(e);
                              getUser(e);
                            }}
                            required
                            disabled
                          />
                          <ErrorMessage name="mobile" component={ErrorText} />
                        </FormGroup>
                      </Col>
                      <Col cW="25%" mR="2%">
                        <FormGroup>
                          <label className="focused">Bill Number</label>
                          <TextInput
                            type="text"
                            name="number"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={`${values.number}C`}
                            placeholder={`${values.number}C`}
                            onChange={handleChange}
                            required
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col cW="25%" mR="2%">
                        {userCode === '' ? (
                          <FormGroup>
                            <label className="focused">Customer Code*</label>
                            <TextInput
                              type="text"
                              name="customer_code"
                              onFocus={(e) => {
                                handleChange(e);
                                inputFocus(e);
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                handleChange(e);
                                inputBlur(e);
                              }}
                              value={values.customer_code}
                              onChange={handleChange}
                              required
                              disabled
                            />
                          </FormGroup>
                        ) : (
                            <FormGroup>
                              <label className="focused">Customer Code*</label>
                              <TextInput
                                type="text"
                                name="customer_code"
                                value={values.customer_code}
                                placeholder={userCode}
                              />
                            </FormGroup>
                          )}
                      </Col>
                    </Row>
                  )}
                {props.mode === 'invoice' ? (
                  <Row>
                    <Col cW="15%" mR="2%">
                      {userName === '' ? (
                        <FormGroup>
                          <label className="focused">Name*</label>
                          <TextInput
                            type="text"
                            name="name"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.name}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      ) : (
                          <FormGroup>
                            <label className="focused">Name*</label>
                            <TextInput
                              type="text"
                              name="name"
                              value={values.name}
                              placeholder={userName}
                            />
                          </FormGroup>
                        )}
                    </Col>
                    <Col cW="15%" mR="2%">
                      {userLastName === '' ? (
                        <FormGroup>
                          <label className="focused">Last Name</label>
                          <TextInput
                            type="text"
                            name="last_name"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.last_name}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      ) : (
                          <FormGroup>
                            <label className="focused">Last Name*</label>
                            <TextInput
                              type="text"
                              name="last_name"
                              value={values.last_name}
                              placeholder={userLastName}
                            />
                          </FormGroup>
                        )}
                    </Col>
                    <Col cW="25%" mR="2%">
                      {userEmail === '' ? (
                        <FormGroup>
                          <label className="focused">Email*</label>
                          <TextInput
                            type="email"
                            name="email"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.email}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      ) : (
                          <FormGroup>
                            <label className="focused">Email*</label>
                            <TextInput
                              type="email"
                              name="email"
                              value={values.email}
                              placeholder={userEmail}
                            />
                          </FormGroup>
                        )}
                    </Col>
                    <Col cW="25%" mR="2%">
                      {userAddress === '' ? (
                        <FormGroup>
                          <label className="focused">Address*</label>
                          <TextInput
                            type="text"
                            name="address"
                            onFocus={(e) => {
                              handleChange(e);
                              inputFocus(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              handleChange(e);
                              inputBlur(e);
                            }}
                            value={values.address}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      ) : (
                          <FormGroup>
                            <label className="focused">Address</label>
                            <TextInput
                              type="text"
                              name="address"
                              value={values.address}
                              placeholder={userAddress}
                            />
                          </FormGroup>
                        )}
                    </Col>
                    <Col cW="20%">
                      {createUser ? (
                        <FormGroup>
                          <Button
                            type="button"
                            onClick={() => {
                              handleSubmit3(values);
                            }}
                            marginTop="10px"
                            style={{
                              padding: '5px',
                              fontFamily: 'Roboto, sans-serif',
                              fontWeight: 500,
                              marginBottom: '6px',
                            }}
                          >
                            <span>Create Customer</span>
                          </Button>
                        </FormGroup>
                      ) : null}
                    </Col>
                  </Row>
                ) : (
                    <Row>
                      <Col cW="15%" mR="2%">
                        {userName === '' ? (
                          <FormGroup>
                            <label className="focused">Name*</label>
                            <TextInput
                              type="text"
                              name="name"
                              onFocus={(e) => {
                                handleChange(e);
                                inputFocus(e);
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                handleChange(e);
                                inputBlur(e);
                              }}
                              value={values.name}
                              onChange={handleChange}
                              required
                              disabled
                            />
                          </FormGroup>
                        ) : (
                            <FormGroup>
                              <label className="focused">Name*</label>
                              <TextInput
                                type="text"
                                name="name"
                                value={values.name}
                                placeholder={userName}
                              />
                            </FormGroup>
                          )}
                      </Col>
                      <Col cW="15%" mR="2%">
                        {userLastName === '' ? (
                          <FormGroup>
                            <label className="focused">Last Name*</label>
                            <TextInput
                              type="text"
                              name="last_name"
                              onFocus={(e) => {
                                handleChange(e);
                                inputFocus(e);
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                handleChange(e);
                                inputBlur(e);
                              }}
                              value={values.last_name}
                              onChange={handleChange}
                              required
                              disabled
                            />
                          </FormGroup>
                        ) : (
                            <FormGroup>
                              <label className="focused">Last Name</label>
                              <TextInput
                                type="text"
                                name="last_name"
                                value={values.last_name}
                                placeholder={userLastName}
                              />
                            </FormGroup>
                          )}
                      </Col>
                      <Col cW="25%" mR="2%">
                        {userEmail === '' ? (
                          <FormGroup>
                            <label className="focused">Email*</label>
                            <TextInput
                              type="email"
                              name="email"
                              onFocus={(e) => {
                                handleChange(e);
                                inputFocus(e);
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                handleChange(e);
                                inputBlur(e);
                              }}
                              value={values.email}
                              onChange={handleChange}
                              required
                              disabled
                            />
                          </FormGroup>
                        ) : (
                            <FormGroup>
                              <label className="focused">Email*</label>
                              <TextInput
                                type="email"
                                name="email"
                                value={values.email}
                                placeholder={userEmail}
                              />
                            </FormGroup>
                          )}
                      </Col>
                      <Col cW="25%" mR="2%">
                        {userAddress === '' ? (
                          <FormGroup>
                            <label className="focused">Address*</label>
                            <TextInput
                              type="text"
                              name="address"
                              onFocus={(e) => {
                                handleChange(e);
                                inputFocus(e);
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                handleChange(e);
                                inputBlur(e);
                              }}
                              value={values.address}
                              onChange={handleChange}
                              required
                              disabled
                            />
                          </FormGroup>
                        ) : (
                            <FormGroup>
                              <label className="focused">Address*</label>
                              <TextInput
                                type="text"
                                name="address"
                                value={values.address}
                                placeholder={userAddress}
                              />
                            </FormGroup>
                          )}
                      </Col>
                      <Col cW="20%">
                        {createUser ? (
                          <FormGroup>
                            <Button
                              type="button"
                              onClick={() => {
                                handleSubmit3(values);
                              }}
                              marginTop="10px"
                              style={{
                                padding: '5px',
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                marginBottom: '6px',
                              }}
                            >
                              <span>Create Customer</span>
                            </Button>
                          </FormGroup>
                        ) : null}
                      </Col>
                    </Row>
                  )}
                <InvoiceDescription
                  offeringlist={offeringList}
                  taxlist={taxList}
                  totalamount={handleTotalAmount}
                  addnewitem={addNewItem}
                  deleteitem={deleteItem}
                  totalamountwithouttax={handleTotalAmountWithoutTax}
                  totaltax={handleTotalTax}
                  itemcodechange={handleItemCodeChange}
                  quantitychange={handleQuantityChange}
                  taxcodechange={handleTaxCodeChange}
                  reset={resteTotalAmount}
                  type={props.type}
                  items={descList}
                ></InvoiceDescription>
                <Row>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <label className="focused">Bill Date</label>
                      <TextInput
                        type="text"
                        name="bill_date"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        value={date}
                        placeholder={date}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <label className="focused">Bill Period*</label>
                      <TextInput
                        type="text"
                        name="bill_period"
                        value={defaultBillPeriod.period_name}
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        placeholder={defaultBillPeriod.period_name}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col cW="33%" mR="2%">
                    <FormGroup>
                      <SelectInput
                        name="term"
                        onFocus={(e) => {
                          handleChange(e);
                          inputFocus(e);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                          handleChange(e);
                          inputBlur(e);
                        }}
                        onChange={handleChange}
                        value={values.term}
                        required
                      >
                        <option key="" value="">
                          Select Term
                        </option>
                        {termNameSelectInput()}
                      </SelectInput>
                      <ErrorMessage name="term" component={ErrorText} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col cW="75%"></Col>
                  <Col cW="25%">
                    <Row style={{ marginTop: '7px', fontSize: '18px' }}>
                      <Col cW="50%">Total Amount</Col>
                      <Col cW="50%">
                        {currency} {totalAmountWithoutTax}
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '7px', fontSize: '18px' }}>
                      <Col cW="50%">Total Tax</Col>
                      <Col cW="50%">
                        {currency} {totalTax}
                      </Col>
                    </Row>
                    <Row style={{ marginTop: '7px', fontSize: '18px' }}>
                      <Col cW="50%">Sum Total</Col>
                      <Col cW="50%">
                        {currency} {totalAmount}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {props.mode === 'invoice' ? (
                  <Row>
                    <Col cW="50%">
                      <Button
                        type="button"
                        filledBtn
                        onClick={() => {
                          handleSubmit2(values);
                        }}
                        marginTop="10px"
                        style={{
                          padding: '5px',
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            size={30}
                            thickness={5}
                            color="primary"
                          />
                        ) : (
                            <span>Save As Draft</span>
                          )}
                        <span> Total XOF {totalAmount}</span>
                      </Button>
                    </Col>
                    <Col cw="50%">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        filledBtn
                        marginTop="10px"
                        style={{
                          padding: '5px',
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            size={30}
                            thickness={5}
                            color="primary"
                          />
                        ) : (
                            <span>
                              {' '}
                              {props.type === 'update'
                                ? 'Update and Validate Invoice'
                                : 'Validate Invoice'}
                            </span>
                          )}
                        <span> Total XOF {totalAmount}</span>
                      </Button>
                    </Col>
                  </Row>
                ) : (
                    <Row>
                      <Col cw="33%">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                          filledBtn
                          marginTop="10px"
                          style={{
                            padding: '5px',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 500,
                          }}
                        >
                          {isSubmitting ? (
                            <CircularProgress
                              size={30}
                              thickness={5}
                              color="primary"
                            />
                          ) : (
                              <span>Create Counter Invoice</span>
                            )}
                          <span> Total XOF {-totalAmount}</span>
                        </Button>
                      </Col>
                    </Row>
                  )}
              </Form>
            </div>
          );
        }}
      </Formik>
    </Popup>
  );
}

export default CreateInvoicePopup;
