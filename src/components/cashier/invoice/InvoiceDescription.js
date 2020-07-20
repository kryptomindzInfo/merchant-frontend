import React, { useEffect, useState } from 'react';
import { strategy } from 'webpack-merge';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '../../shared/Button';
import Table from '../../shared/Table';
import FormGroup from '../../shared/FormGroup';
import TextInput from '../../shared/TextInput';
import SelectInput from '../../shared/SelectInput';

const InvoiceDescription = (props) => {
  const [offeringList, setOfferingList] = React.useState(
    props.offeringlist.filter((sindex) => sindex.type === '0'),
  );
  const [productList, setProductList] = React.useState(
    props.offeringlist.filter((sindex) => sindex.type === '0'),
  );
  const [serviceList, setServiceList] = React.useState(
    props.offeringlist.filter((sindex) => sindex.type === '1'),
  );
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [toggleButton, setToggleButton] = React.useState('product');
  const [taxList, setTaxList] = React.useState(props.taxlist);
  const [descriptionList, setDescriptionList] = React.useState([
    {
      index: Math.random(),
      name: '',
      description: '',
      denomination: '',
      unitOfMeasure: '',
      unitPrice: '',
      quantity: 0,
      tax: 0,
      amount: 0,
    },
  ]);

  const toggleProduct = () => {
    if (toggleButton !== 'product') {
      setToggleButton('product');
      setDescriptionList([
        {
          index: Math.random(),
          name: '',
          description: '',
          denomination: '',
          unitOfMeasure: '',
          unitPrice: 0,
          quantity: 0,
          tax: 0,
          amount: 0,
        },
      ]);
      props.reset();
    }
  };

  const toggleService = () => {
    if (toggleButton !== 'service') {
      setToggleButton('service');
      setDescriptionList([
        {
          index: Math.random(),
          name: '',
          description: '',
          denomination: '',
          unitOfMeasure: '',
          unitPrice: 0,
          quantity: 0,
          tax: 0,
          amount: 0,
        },
      ]);
      props.reset();
    }
  };

  const deleteRow = (value, index) => {
    setDescriptionList(descriptionList.filter((sindex) => value !== sindex));
    props.deleteitem(index);
  };

  const handleOfferingNameChange = (e) => {
    const descriptionL = [...descriptionList];
    if (
      descriptionL.filter((sindex) => sindex.name === e.target.value).length > 0
    ) {
      deleteRow(descriptionL[e.target.id], e.target.id);
    } else {
      const olist = props.offeringlist.filter(
        (sindex) => sindex.name === e.target.value,
      );
      const ta = descriptionL[e.target.id].tax;
      const ind = descriptionL[e.target.id].index;
      const quan = descriptionL[e.target.id].quantity;
      const prevamount = parseFloat(descriptionL[e.target.id].amount);
      const amountWithoutTax =
        parseFloat(olist[0].unit_price) * parseFloat(quan);
      const taxOnAmount = amountWithoutTax * (parseFloat(ta) / 100);
      const newamount = parseFloat(amountWithoutTax + taxOnAmount);
      props.totalamount(prevamount, newamount);
      descriptionL[e.target.id] = {
        index: ind,
        name: olist[0].name,
        description: olist[0].description,
        denomination: olist[0].denomination,
        unitOfMeasure: olist[0].unit_of_measure,
        unitPrice: olist[0].unit_price,
        quantity: quan,
        tax: ta,
        amount: newamount,
      };
      setDescriptionList(descriptionL);
      props.itemcodechange(olist[0].code, e.target.id);
    }
  };

  const handleTaxChange = (e) => {
    const tlist = props.taxlist.filter(
      (sindex) => sindex.value === parseFloat(e.target.value),
    );
    const descriptionL = [...descriptionList];
    if (
      e.target.value === undefined ||
      Number.isNaN(parseFloat(e.target.value))
    ) {
      descriptionL[e.target.id].tax = 0;
    } else {
      descriptionL[e.target.id].tax = parseFloat(e.target.value);
    }
    const prevamount = parseFloat(descriptionL[e.target.id].amount);
    const amountWithoutTax =
      parseFloat(descriptionL[e.target.id].unitPrice) *
      parseFloat(descriptionL[e.target.id].quantity);
    const taxOnAmount =
      amountWithoutTax * (parseFloat(descriptionL[e.target.id].tax) / 100);
    const amount = parseFloat(amountWithoutTax + taxOnAmount);
    descriptionL[e.target.id].amount = amount;
    setDescriptionList(descriptionL);
    props.taxcodechange(tlist[0].code, amount, e.target.id);
    props.totalamount(prevamount, amount);
  };

  const handleQuantityChange = (e) => {
    const descriptionL = [...descriptionList];
    if (
      e.target.value === undefined ||
      Number.isNaN(parseFloat(e.target.value))
    ) {
      descriptionL[e.target.id].quantity = 0;
    } else {
      descriptionL[e.target.id].quantity = parseFloat(e.target.value);
    }
    const prevamount = parseFloat(descriptionL[e.target.id].amount);
    const amountWithoutTax =
      parseFloat(descriptionL[e.target.id].unitPrice) *
      parseFloat(descriptionL[e.target.id].quantity);
    const taxOnAmount =
      amountWithoutTax * (parseFloat(descriptionL[e.target.id].tax) / 100);
    const amount = parseFloat(amountWithoutTax + taxOnAmount);
    descriptionL[e.target.id].amount = amount;
    setDescriptionList(descriptionL);
    props.quantitychange(parseFloat(e.target.value), amount, e.target.id);
    props.totalamount(prevamount, amount);
  };

  const addNewRow = (e) => {
    setDescriptionList([
      ...descriptionList,
      {
        index: Math.random(),
        name: '',
        description: '',
        denomination: '',
        unitOfMeasure: '',
        unitPrice: 0,
        quantity: 0,
        tax: 0,
        amount: 0,
      },
    ]);
    props.addnewitem();
  };

  const taxSelectInput = () => {
    return taxList.map((val, index) => {
      return (
        <option key={val.name} value={val.value}>
          {val.value}
        </option>
      );
    });
  };

  const nameSelectInput = () => {
    return (toggleButton === 'product' ? productList : serviceList).map(
      (val, index) => {
        return (
          <option key={val.name} value={val.name}>
            {val.name}
          </option>
        );
      },
    );
  };

  const tableRows = () => {
    return descriptionList.map((val, index) => {
      const name = `name-${index}`;
      const description = `description-${index}`;
      const denomination = `denomination-${index}`;
      const unitOfMeasure = `unitOfMeasure-${index}`;
      const uPrice = `uPrice-${index}`;
      const quantity = `quantity-${index}`;
      const tax = `tax-${index}`;
      const amount = `amount-${index}`;
      return (
        <tr key={val.index}>
          <td smallTd>
            <FormGroup onChange={handleOfferingNameChange}>
              <SelectInput
                noPadding
                name="name"
                id={index}
                style={{
                  marginBottom: '0px',
                }}
                required
              >
                <option value="">Select Name</option>
                {nameSelectInput()}
              </SelectInput>
            </FormGroup>
          </td>
          <td smallTd>{val.description}</td>
          <td smallTd>{val.denomination}</td>
          <td smallTd>{val.unitOfMeasure}</td>
          <td smallTd>{val.unitPrice}</td>
          <td smallTd>
            <FormGroup onChange={handleQuantityChange} required>
              <TextInput
                noMargin
                noPadding
                type="text"
                name="quantity"
                id={index}
                required
              />
            </FormGroup>
          </td>
          <td smallTd>
            <FormGroup onChange={handleTaxChange} required>
              <SelectInput
                noPadding
                name="tax"
                id={index}
                style={{
                  marginBottom: '0px',
                }}
                required
              >
                <option value="">Select tax</option>
                {taxSelectInput()}
              </SelectInput>
            </FormGroup>
          </td>
          <td smallTd>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <td>{val.amount}</td>
              <span
                className="absoluteMiddleRight primary"
                onClick={() => deleteRow(val, index)}
              >
                {index !== 0 ? (
                  <RemoveCircleIcon
                    style={{
                      color: '#f5a623',
                      fontSize: 30,
                    }}
                  />
                ) : null}
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'left',
          marginTop: '10px',
        }}
      >
        <Button
          className={toggleButton === 'product' ? 'active' : ''}
          onClick={toggleProduct}
          marginRight="5px"
          padding="5px"
        >
          Product
        </Button>
        <Button
          className={toggleButton === 'service' ? 'active' : ''}
          onClick={toggleService}
          marginLeft="20px"
        >
          Service
        </Button>
      </div>
      <Table marginTop="34px" smallTd>
        <thead>
          <tr>
            <th>Offering Name</th>
            <th>Description</th>
            <th>Denomination</th>
            <th>Unit of measure</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Tax</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </Table>
      <div
        onClick={(event) => addNewRow()}
        style={{
          marginBottom: '10px',
          marginLeft: '10px',
        }}
      >
        <AddCircleIcon
          style={{
            color: '#f5a623',
            fontSize: 30,
          }}
        />
      </div>
    </div>
  );
};

export default InvoiceDescription;
