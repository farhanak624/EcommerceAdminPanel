import React, { useState } from "react";

const CompanyDetails = ({
  fields,
  setFields,
  companyType,
  setCompanyType,
  companyDatas,
  setCompanyDatas,
}) => {
  const handleCompanyTypeChange = (e) => {
    setCompanyType(e.target.value);
    if (
      e.target.value === "Properatorship" ||
      e.target.value === "One Person Company"
    ) {
      setFields([""]);
    } else {
      setFields([""]);
    }
  };
  const handleAddField = () => {
    if (
      companyType !== "Properatorship" &&
      companyType !== "One Person Company"
    ) {
      setFields([...fields, ""]);
    }
  };

  const handleFieldChange = (index, e) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
  };
  const handleRemoveField = (index) => {
    if (fields.length > 1) {
      const newFields = fields.filter((_, i) => i !== index);
      setFields(newFields);
    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="justify-center p-3 border border-gray-400 rounded-lg max-w-[450px] w-full">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Add your Company Details (Optional)
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="company-type"
                className="block text-sm font-medium mb-1"
              >
                Company Type
              </label>
              <select
                id="company-type"
                className="w-full p-2 border rounded bg-input text-foreground"
                value={companyType}
                onChange={handleCompanyTypeChange}
              >
                <option value="">Select Company Type</option>
                <option value="Public Limited">Public Limited</option>
                <option value="Private Limited">Private Limited</option>
                <option value="PartnerShip">PartnerShip</option>
                <option value="Properatorship">Properatorship</option>
                <option value="LLP">LLP</option>
                <option value="One Person Company">One Person Company</option>
              </select>
            </div>
            {companyType && (
              <div className=" mt-4">
                <label className="block text-sm font-medium mb-1">
                  Additional Field for {companyType}
                </label>
                {fields?.map((field, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <input
                      type="text"
                      className="w-full p-2 border rounded bg-input text-foreground"
                      placeholder={`Name ${index + 1}`}
                      value={field.value}
                      onChange={(e) => handleFieldChange(index, e)}
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        className="inline-flex justify-center items-center ml-2 p-2 w-10 bg-red-500 text-white rounded"
                        onClick={() => handleRemoveField(index)}
                      >
                        -
                      </button>
                    )}
                    {companyType !== "Properatorship" &&
                      companyType !== "One Person Company" && (
                        <button
                          type="button"
                          className="p-2 ml-1 w-10 border rounded bg-navblue text-white"
                          onClick={handleAddField}
                        >
                          +
                        </button>
                      )}
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="gst-number"
                  className="block text-sm font-medium mb-1"
                >
                  GST Number
                </label>
                <input
                  type="text"
                  value={companyDatas.gstNumber}
                  id="gst-number"
                  onChange={(e) => {
                    setCompanyDatas({
                      ...companyDatas,
                      gstNumber: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded bg-input text-foreground"
                  placeholder="GST Number"
                />
              </div>
              <div>
                <label
                  htmlFor="trade-licence"
                  className="block text-sm font-medium mb-1"
                >
                  Trade Licence
                </label>
                <input
                  type="text"
                  value={companyDatas.tradeLicence}
                  onChange={(e) => {
                    setCompanyDatas({
                      ...companyDatas,
                      tradeLicense: e.target.value,
                    });
                  }}
                  id="trade-licence"
                  className="w-full p-2 border rounded bg-input text-foreground"
                  placeholder="Trade Licence"
                />
              </div>
              <div>
                <label
                  htmlFor="din-number"
                  className="block text-sm font-medium mb-1"
                >
                  DIN Number
                </label>
                <input
                  type="text"
                  value={companyDatas.dinNumber}
                  onChange={(e) => {
                    setCompanyDatas({
                      ...companyDatas,
                      dinNumber: e.target.value,
                    });
                  }}
                  id="din-number"
                  className="w-full p-2 border rounded bg-input text-foreground"
                  placeholder="DIN Number"
                />
              </div>
              <div>
                <label
                  htmlFor="roc-documents"
                  className="block text-sm font-medium mb-1"
                >
                  ROC
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    setCompanyDatas({
                      ...companyDatas,
                      roc: e.target.files[0],
                    });
                  }}
                  id="roc-documents"
                  className="w-full p-2 border rounded bg-input text-foreground file:rounded-lg"
                  placeholder="ROC Documents"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
