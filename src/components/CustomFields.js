import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, message } from "antd";
import { v4 as uuid } from "uuid";

const CustomFields = ({ fields, setFields, customFieldsLang, fieldTypes, setFieldTypes }) => {
  const field_id = uuid();

  function limitFieldTypes() {
    let newFieldTypes = fieldTypes;
    fieldTypes.forEach((type) => {
      let typeCounter = 0;
      fields.forEach((field) => {
        if (type.value === field.type) {
          typeCounter++;
        }
      });

      newFieldTypes = newFieldTypes.map((item) => {
        if (item.value === type.value) {
          return { ...type, hide: typeCounter >= 3 };
        }
        return item;
      });
    });
    setFieldTypes(newFieldTypes);
  }

  function addField() {
    if (fields.length < 15) {
      fields.push({ label: "", type: "", field_id, invalid: false });
      setFields([...fields]);
    } else {
      message.error(customFieldsLang?.limitFieldMessage);
    }
  }

  function handleInputChange(e, index) {
    fields[index].label = e.target.value;
    fields[index].invalid = e.target.value === "";
    setFields([...fields]);
  }

  function handleSelectChange(value, index) {
    fields[index].type = value;
    fields[index].invalid = value === "";
    limitFieldTypes();
    setFields([...fields]);
  }

  function deleteField(index) {
    fields.splice(index, 1);
    limitFieldTypes();
    setFields([...fields]);
  }

  return (
    <div>
      {fields?.map((field, index) => (
        <div
          key={field?.field_id}
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "5px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <div style={{ marginBlock: "3px", width: "55%", flexGrow: 1 }}>
            <Input
              status={field?.invalid && "error"}
              onChange={(e) => handleInputChange(e, index)}
              placeholder={customFieldsLang?.inpPlaceholder}
            />
            {field?.invalid && (
              <div style={{ color: "#FF4D4F", fontSize: 14 }}>
                {customFieldsLang?.fieldInvalidMessage}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: "5px", marginBlock: "3px", flexGrow: 1 }}>
            <Select
              status={field?.invalid && "error"}
              style={{ minWidth: "133px" }}
              dropdownMatchSelectWidth={false}
              showSearch={"single"}
              placeholder={customFieldsLang?.selectTypePlaceholder}
              onChange={(value) => handleSelectChange(value, index)}
              options={fieldTypes.filter((item) => !item.hide)}
            />
            <Button onClick={() => deleteField(index)}>x</Button>
          </div>
        </div>
      ))}
      <Button
        style={{ marginTop: "8px" }}
        onClick={addField}
        type="dashed"
        block
        icon={<PlusOutlined />}
      >
        {customFieldsLang?.addFieldBtn}
      </Button>
    </div>
  );
};
export default CustomFields;
