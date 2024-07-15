/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Edit/EditField.jsx":
/*!*******************************************!*\
  !*** ./src/components/Edit/EditField.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const EditField = ({
  field,
  index,
  handleChange,
  handleFieldChangeType,
  removeField,
  handleOptionsChange,
  rowIndex,
  isLast
}) => {
  if (!field.options) {
    field.options = ["add Select"];
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "row"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: field.label,
    placeholder: field.label,
    type: field.type,
    onChange: value => handleChange(value, rowIndex, index)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    value: field.type,
    options: [{
      label: "Text",
      value: "text"
    }, {
      label: "Email",
      value: "email"
    }, {
      label: "Number",
      value: "number"
    }, {
      label: "Select",
      value: "select"
    }],
    onChange: value => handleFieldChangeType(value, rowIndex, index)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    icon: "trash",
    onClick: () => removeField(rowIndex, index)
  })), field.type === "select" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    help: " Instructions: (comma separated)",
    label: " Set Options field of: " + field.label,
    value: field.options.join(", "),
    onChange: value => handleOptionsChange(value, rowIndex, index)
  }), !isLast && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "10px",
      opacity: "0.3",
      height: "1px",
      backgroundColor: "white"
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditField);

/***/ }),

/***/ "./src/components/Edit/Form.js":
/*!*************************************!*\
  !*** ./src/components/Edit/Form.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _form_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../form-styles.css */ "./src/form-styles.css");




const Form = ({
  attributes
}) => {
  const [service, setService] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const handleServiceChange = value => {
    setService(value);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const serviceOptions = attributes.labelOptions.split(",").map(option => option.split(":")).map(([label, value]) => ({
      label,
      value
    }));
    if (serviceOptions.length > 0) {
      setService(serviceOptions[0].value);
    }
  }, [attributes.labelOptions]);
  const handleClick = e => {
    e.preventDefault();
    alert("Form sent with payment method: ");
  };
  const getServiceCost = () => {
    if (!service) return "";
    const selectedOption = attributes.labelOptions.split(",").map(option => option.split(":")).find(([label, value]) => value === service);
    return selectedOption ? selectedOption[1] : "";
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    style: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: `${attributes.colorBgTable}`,
      padding: `${attributes.paddingTable}px`
    },
    className: "custom-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    style: {
      fontSize: `${attributes.fontSizeTitle}px`,
      color: `${attributes.colorTitle}`,
      marginBottom: `${attributes.marginBottomTitle}px`,
      alignSelf: `${attributes.alignment}`
    }
  }, attributes.formTitle), attributes.enablePayU && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Steps 1"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: `${attributes.gapColumn}px`
    },
    className: "form-fields"
  }, attributes.fields.map((row, rowIndex) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: rowIndex,
    style: {
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      gap: `${attributes.gapRow}px`,
      alignItems: "center",
      "--colorLabel": `${attributes.colorLabel}`,
      "--sizeLabel": `${attributes.fontSizeLabel}px`
    },
    className: "form-row"
  }, Array.isArray(row) ? row.map((field, index) => field.type === "select" ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    key: index,
    label: field.label,
    value: field.options[0].value,
    options: field.options.map((option, optionIndex) => ({
      label: option,
      value: option,
      key: optionIndex
    }))
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    key: index,
    label: field.label,
    type: field.type
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Error: Row is not an array")))), attributes.enablePayU && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      "--colorLabel": `${attributes.colorLabel}`,
      "--sizeLabel": `${attributes.fontSizeLabel}px`
    },
    className: "payu-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: attributes.labelService,
    value: service,
    options: attributes.labelOptions.split(",").map(option => option.split(":")).map(([label, value]) => ({
      label,
      value
    })),
    onChange: handleServiceChange
  }), service && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "service-cost"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, attributes.titleCost, ":"), " ", getServiceCost() + "" + "pln")), attributes.enablePayU && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Steps 2"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.titleFormPayU), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      "--colorLabel": `${attributes.colorLabel}`,
      "--sizeLabel": `${attributes.fontSizeLabel}px`
    },
    className: "payu-fields"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "First Name",
    name: "buyer_first_name"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Last Name",
    name: "buyer_last_name"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      paddingInline: `${attributes.paddingInlineButton}px`,
      paddingBlock: `${attributes.paddingBlockButton}px`,
      alignSelf: `${attributes.alignmentBtn}`,
      "--margin-top": `${attributes.marginTopBtn}px`,
      "--font-size": `${attributes.sizeTextButton}px`,
      "--color": `${attributes.colorTextButton}`,
      "--bg-color": `${attributes.colorBgButton}`,
      "--hover-bg-color": `${attributes.hoverColorBgButton}`,
      "--hover-text-color": `${attributes.hoverColorTextButton}`
    },
    className: "button"
  }, attributes.btnTitle));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);

/***/ }),

/***/ "./src/components/Edit/panels/CreateFormPanel.js":
/*!*******************************************************!*\
  !*** ./src/components/Edit/panels/CreateFormPanel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EditField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EditField */ "./src/components/Edit/EditField.jsx");




const CreateFormPanel = ({
  attributes,
  setAttributes
}) => {
  const [fieldLabel, setFieldLabel] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [fieldType, setFieldType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("text");
  const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [addInNewLine, setAddInNewLine] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleChange = (value, rowIndex, index) => {
    const newFields = [...attributes.fields];
    newFields[rowIndex][index].label = value;
    setAttributes({
      fields: newFields
    });
  };
  const handleFieldChangeType = (value, rowIndex, index) => {
    const newFields = [...attributes.fields];
    newFields[rowIndex][index].type = value;
    setAttributes({
      fields: newFields
    });
  };
  const removeField = (rowIndex, index) => {
    const newFields = [...attributes.fields];
    newFields[rowIndex].splice(index, 1);
    if (newFields[rowIndex].length === 0) {
      newFields.splice(rowIndex, 1);
    }
    setAttributes({
      fields: newFields
    });
  };
  const addField = () => {
    const newField = {
      label: fieldLabel,
      type: fieldType
    };
    if (fieldType === "select") {
      newField.options = options.split(",").map(opt => opt.trim());
    }
    if (addInNewLine) {
      setAttributes({
        fields: [...attributes.fields, [newField]]
      });
    } else {
      const updatedFields = [...attributes.fields];
      updatedFields[updatedFields.length - 1].push(newField);
      setAttributes({
        fields: updatedFields
      });
    }
    setFieldLabel("");
    setFieldType("text");
    setOptions("");
  };
  const handleOptionsChange = (value, rowIndex, index) => {
    const newFields = [...attributes.fields];
    newFields[rowIndex][index].options = value.split(",").map(opt => opt.trim());
    setAttributes({
      fields: newFields
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: "CREATE FORM",
    className: "panelBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Create Title"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Set Title",
    value: attributes.formTitle,
    onChange: value => setAttributes({
      formTitle: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Edit / Delete Fields"), attributes.fields.map((row, rowIndex) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: rowIndex,
    style: {
      marginBottom: "10px"
    }
  }, Array.isArray(row) ? row.map((field, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_EditField__WEBPACK_IMPORTED_MODULE_2__["default"], {
    field: field,
    index: index,
    handleChange: handleChange,
    handleFieldChangeType: handleFieldChangeType,
    removeField: removeField,
    handleOptionsChange: handleOptionsChange,
    rowIndex: rowIndex,
    isLast: index === attributes.fields.length - 1
  })) : null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Create Fields"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "New Field",
    value: fieldLabel,
    onChange: value => setFieldLabel(value)
  }), fieldLabel !== "" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: "Field Type",
    value: fieldType,
    options: [{
      label: "Text",
      value: "text"
    }, {
      label: "Email",
      value: "email"
    }, {
      label: "Number",
      value: "number"
    }, {
      label: "Select",
      value: "select"
    }],
    onChange: value => setFieldType(value)
  }), fieldType === "select" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    help: "Instructions: (comma separated)",
    label: "Options ",
    value: options,
    onChange: value => setOptions(value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Add in new line",
    checked: addInNewLine,
    onChange: isChecked => setAddInNewLine(isChecked)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    icon: "plus",
    isBusy: "true",
    onClick: addField,
    className: "btn"
  }, "Add Field"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Create Button Submit"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Set Title Button ex. Submit",
    value: attributes.btnTitle,
    onChange: value => setAttributes({
      btnTitle: value
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateFormPanel);

/***/ }),

/***/ "./src/components/Edit/panels/OptionFormPanel.js":
/*!*******************************************************!*\
  !*** ./src/components/Edit/panels/OptionFormPanel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const OptionFormPanel = ({
  attributes,
  setAttributes
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: "OPTION FORM",
    initialOpen: false,
    className: "panelBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Enable PayU Payment",
    checked: attributes.enablePayU,
    onChange: isChecked => setAttributes({
      enablePayU: isChecked
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionFormPanel);

/***/ }),

/***/ "./src/components/Edit/panels/PayuPaymentPanel.js":
/*!********************************************************!*\
  !*** ./src/components/Edit/panels/PayuPaymentPanel.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const PayuPaymentPanel = ({
  attributes,
  setAttributes
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: "PayU Payment Settings",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Create Form PayU"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Set Label",
    value: attributes.labelService,
    placeholder: "Choose service",
    onChange: value => setAttributes({
      labelService: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    help: "(comma separated, format: Name service: value service)",
    label: "Set Label Options ",
    value: attributes.labelOptions,
    onChange: value => {
      setAttributes({
        labelOptions: value
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Set Title Cost",
    value: attributes.titleCost,
    onChange: value => setAttributes({
      titleCost: value
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: "Set Title Form PayU",
    placeholder: "Dane do p\u0142atno\u015Bci",
    value: attributes.titleFormPayU,
    onChange: value => setAttributes({
      titleFormPayU: value
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PayuPaymentPanel);

/***/ }),

/***/ "./src/components/Edit/panels/SchemaFormPanel.js":
/*!*******************************************************!*\
  !*** ./src/components/Edit/panels/SchemaFormPanel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const SchemaFormPanel = ({
  attributes,
  setAttributes
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: "SCHEMA FORM",
    initialOpen: false,
    className: "panelBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Background Color"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.colorBgTable,
    onChange: value => {
      setAttributes({
        colorBgTable: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Title Color"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.colorTitle,
    onChange: value => {
      setAttributes({
        colorTitle: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Label Color"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.colorLabel,
    onChange: value => {
      setAttributes({
        colorLabel: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Text Color Button"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.colorTextButton,
    onChange: value => {
      setAttributes({
        colorTextButton: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Background Color Button"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.colorBgButton,
    onChange: value => {
      setAttributes({
        colorBgButton: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Hover Background Color Button"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.hoverColorBgButton,
    onChange: value => {
      setAttributes({
        hoverColorBgButton: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Set Hover Text Color Button"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
    color: attributes.hoverColorTextButton,
    onChange: value => {
      setAttributes({
        hoverColorTextButton: value
      });
    },
    enableAlpha: true,
    defaultValue: "#000"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SchemaFormPanel);

/***/ }),

/***/ "./src/components/Edit/panels/SettingsFormPanel.js":
/*!*********************************************************!*\
  !*** ./src/components/Edit/panels/SettingsFormPanel.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);



const SettingsFormPanel = ({
  attributes,
  setAttributes
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: "SETTINGS FORM",
    initialOpen: false,
    className: "panelBody"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Setting Form"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Padding Table",
    value: attributes.paddingTable,
    onChange: value => setAttributes({
      paddingTable: value
    }),
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Gap Row Fields",
    value: attributes.gapRow,
    onChange: value => setAttributes({
      gapRow: value
    }),
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Gap Column Fields",
    value: attributes.gapColumn,
    onChange: value => setAttributes({
      gapColumn: value
    }),
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Setting Title"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Font Size title",
    value: attributes.fontSizeTitle,
    onChange: newFontSize => {
      setAttributes({
        fontSizeTitle: newFontSize
      });
    },
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Left",
    checked: attributes.alignment === "start",
    onChange: isChecked => isChecked && setAttributes({
      alignment: "start"
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Center",
    checked: attributes.alignment === "center",
    onChange: isChecked => isChecked && setAttributes({
      alignment: "center"
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Right",
    checked: attributes.alignment === "end",
    onChange: isChecked => isChecked && setAttributes({
      alignment: "end"
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Set Margin Bottom",
    value: attributes.marginBottomTitle,
    onChange: value => {
      setAttributes({
        marginBottomTitle: value
      });
    },
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Setting Labels"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Font Size Label",
    value: attributes.fontSizeLabel,
    onChange: newFontSize => {
      setAttributes({
        fontSizeLabel: newFontSize
      });
    },
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, {
    className: "titleRow"
  }, "Setting Button"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Padding Inline Button",
    value: attributes.paddingInlineButton,
    onChange: value => {
      setAttributes({
        paddingInlineButton: value
      });
    },
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Padding Block Button",
    value: attributes.paddingBlockButton,
    onChange: value => {
      setAttributes({
        paddingBlockButton: value
      });
    },
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Size Text Button",
    value: attributes.sizeTextButton,
    onChange: value => {
      setAttributes({
        sizeTextButton: value
      });
    },
    min: 2,
    max: 150
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Left",
    checked: attributes.alignmentBtn === "start",
    onChange: isChecked => isChecked && setAttributes({
      alignmentBtn: "start"
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Center",
    checked: attributes.alignmentBtn === "center",
    onChange: isChecked => isChecked && setAttributes({
      alignmentBtn: "center"
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: "Right",
    checked: attributes.alignmentBtn === "end",
    onChange: isChecked => isChecked && setAttributes({
      alignmentBtn: "end"
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
    label: "Set Margin Top",
    value: attributes.marginTopBtn,
    onChange: value => {
      setAttributes({
        marginTopBtn: value
      });
    },
    min: 2,
    max: 150
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsFormPanel);

/***/ }),

/***/ "./src/components/Save/FormFields.js":
/*!*******************************************!*\
  !*** ./src/components/Save/FormFields.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const FormFields = ({
  attributes
}) => {
  const renderField = (field, rowIndex, index) => {
    return field.type === "select" ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      style: {
        display: "flex",
        flexDirection: "column"
      },
      className: "form-control"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: `sel` + rowIndex + index
    }, field.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      id: `sel` + rowIndex + index,
      name: `sel` + rowIndex + index
    }, field.options.map((option, optionIndex) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      key: optionIndex,
      value: option
    }, option)))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      style: {
        display: "flex",
        flexDirection: "column"
      },
      className: "form-control"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      for: `inp` + rowIndex + index
    }, field.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: field.type,
      id: `inp` + rowIndex + index,
      name: `inp` + rowIndex + index
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: `${attributes.gapColumn}px`
    },
    className: "form-fields"
  }, attributes.fields.map((row, rowIndex) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: rowIndex,
    style: {
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      gap: `${attributes.gapRow}px`,
      alignItems: "center"
    },
    className: "form-row"
  }, Array.isArray(row) ? row.map((field, index) => renderField(field, rowIndex, index)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Error: Row is not an array"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFields);

/***/ }),

/***/ "./src/components/Save/PayuSection.js":
/*!********************************************!*\
  !*** ./src/components/Save/PayuSection.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const PayuSection = ({
  attributes
}) => {
  const optionsArray = attributes.labelOptions.split(",").map(option => option.split(":")).map(([label, value]) => ({
    label,
    value
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      alignItems: "flex-end"
    },
    className: "payu-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    },
    className: "form-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "service_select"
  }, attributes.labelService), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "service_select",
    name: "service_select",
    onChange: "document.getElementById('dynamic-cost').textContent = this.value + ' ' +  'pln';"
  }, optionsArray.map((option, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: option.value
  }, option.label)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "service-cost"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, attributes.titleCost, ":"), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    id: "dynamic-cost"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Steps 2"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, attributes.titleFormPayU), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      gap: "10px"
    },
    className: "payu-fields"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    },
    className: "form-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "buyer_first_name"
  }, "First Name"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "buyer_first_name",
    id: "buyer_first_name"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    },
    className: "form-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    for: "buyer_last_name"
  }, "Last Name"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "buyer_last_name",
    id: "buyer_last_name"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PayuSection);

/***/ }),

/***/ "./src/components/Save/SubmitButton.js":
/*!*********************************************!*\
  !*** ./src/components/Save/SubmitButton.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const SubmitButton = ({
  attributes
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    style: {
      paddingInline: `${attributes.paddingInlineButton}px`,
      paddingBlock: `${attributes.paddingBlockButton}px`,
      fontSize: `${attributes.sizeTextButton}px`,
      color: `${attributes.colorTextButton}`,
      backgroundColor: `${attributes.colorBgButton}`,
      "--margin-top": `${attributes.marginTopBtn}px`,
      "--hover-bg-color": `${attributes.hoverColorBgButton}`,
      "--hover-text-button": `${attributes.hoverColorTextButton}`
    },
    type: "submit",
    className: "button"
  }, attributes.btnTitle);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitButton);

/***/ }),

/***/ "./src/edit.jsx":
/*!**********************!*\
  !*** ./src/edit.jsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Edit_Form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Edit/Form */ "./src/components/Edit/Form.js");
/* harmony import */ var _components_Edit_panels_CreateFormPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Edit/panels/CreateFormPanel */ "./src/components/Edit/panels/CreateFormPanel.js");
/* harmony import */ var _components_Edit_panels_SettingsFormPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Edit/panels/SettingsFormPanel */ "./src/components/Edit/panels/SettingsFormPanel.js");
/* harmony import */ var _components_Edit_panels_SchemaFormPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Edit/panels/SchemaFormPanel */ "./src/components/Edit/panels/SchemaFormPanel.js");
/* harmony import */ var _components_Edit_panels_OptionFormPanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Edit/panels/OptionFormPanel */ "./src/components/Edit/panels/OptionFormPanel.js");
/* harmony import */ var _components_Edit_panels_PayuPaymentPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Edit/panels/PayuPaymentPanel */ "./src/components/Edit/panels/PayuPaymentPanel.js");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */







const Edit = props => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const {
    attributes: {
      enablePayU
    },
    setAttributes
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    key: "Setting"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Edit_panels_CreateFormPanel__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: props.attributes,
    setAttributes: props.setAttributes
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Edit_panels_SettingsFormPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: props.attributes,
    setAttributes: props.setAttributes
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Edit_panels_SchemaFormPanel__WEBPACK_IMPORTED_MODULE_8__["default"], {
    attributes: props.attributes,
    setAttributes: props.setAttributes
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Edit_panels_OptionFormPanel__WEBPACK_IMPORTED_MODULE_9__["default"], {
    attributes: props.attributes,
    setAttributes: props.setAttributes
  }), enablePayU && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Edit_panels_PayuPaymentPanel__WEBPACK_IMPORTED_MODULE_10__["default"], {
    attributes: props.attributes,
    setAttributes: props.setAttributes
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Edit_Form__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: props.attributes
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.jsx");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/save.jsx");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/save.jsx":
/*!**********************!*\
  !*** ./src/save.jsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _form_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-styles.css */ "./src/form-styles.css");
/* harmony import */ var _components_Save_FormFields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Save/FormFields */ "./src/components/Save/FormFields.js");
/* harmony import */ var _components_Save_PayuSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Save/PayuSection */ "./src/components/Save/PayuSection.js");
/* harmony import */ var _components_Save_SubmitButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Save/SubmitButton */ "./src/components/Save/SubmitButton.js");

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 *
 *
 */




const save = ({
  attributes
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(),
    id: attributes.enablePayU ? "your-form-id" : "other-form",
    method: "post",
    style: {
      padding: `${attributes.paddingTable}px`,
      backgroundColor: `${attributes.colorBgTable}`
    },
    className: "custom-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    style: {
      fontSize: `${attributes.fontSizeTitle}px`,
      color: `${attributes.colorTitle}`,
      marginBottom: `${attributes.marginBottomTitle}px`,
      alignSelf: `${attributes.alignment}`
    }
  }, attributes.formTitle), attributes.enablePayU && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Steps 1"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Save_FormFields__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes
  }), attributes.enablePayU && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Save_PayuSection__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Save_SubmitButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (save);

/***/ }),

/***/ "./src/form-styles.css":
/*!*****************************!*\
  !*** ./src/form-styles.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/form-creator","version":"0.1.0","title":"Form Creator","category":"widgets","icon":"smiley","description":"Example block scaffolded with Create Block tool.","example":{},"attributes":{"formTitle":{"type":"string","default":"Form Title"},"fontSizeTitle":{"type":"number","default":35},"fontSizeLabel":{"type":"number","default":18},"colorTitle":{"type":"string","default":"#f00"},"colorLabel":{"type":"string","default":"#f00"},"fontSizeLabels":{"type":"number","default":12},"colorLabels":{"type":"string","default":"#f00"},"paddingTable":{"type":"number","default":30},"gapRow":{"type":"number","default":5},"gapColumn":{"type":"number","default":5},"marginBottomTitle":{"type":"number","default":5},"paddingInlineButton":{"type":"number","default":24},"paddingBlockButton":{"type":"number","default":10},"sizeTextButton":{"type":"number","default":18},"colorTextButton":{"type":"string","default":"#FFFFFF"},"colorBgButton":{"type":"string","default":"#000000"},"colorBgTable":{"type":"string","default":"#FFFFFF"},"hoverColorBgButton":{"type":"string","default":"#FFFFFF"},"hoverColorTextButton":{"type":"string","default":"#000000"},"marginTopBtn":{"type":"number","default":30},"alignment":{"type":"string","default":"start"},"alignmentBtn":{"type":"string","default":"start"},"btnTitle":{"type":"string","default":"Submit"},"titleFormPayU":{"type":"string","default":"Payment Details"},"labelService":{"type":"string","default":"Choose Service"},"serviceOptions":{"type":"string","default":""},"labelOptions":{"type":"string","default":"Turniej A - 200pln:200, Turniej B - 500pln:500, Turniej C - 1000pln:1000"},"titleCost":{"type":"string","default":"Cost Service"},"fields":{"type":"array","default":[[{"label":"Name","type":"Text"},{"label":"Username","type":"Text"}],[{"label":"Email","type":"Email"},{"label":"Phone","type":"Number"}]]},"enablePayU":{"type":"boolean","default":false}},"supports":{"color":{"text":true,"link":true,"background":true}},"textdomain":"form-creator","editorScript":"file:./index.js","editorStyle":"file:./index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkform_creator"] = globalThis["webpackChunkform_creator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map