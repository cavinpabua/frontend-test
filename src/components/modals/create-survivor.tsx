import {
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Select,
  message,
} from "antd";
import { CreateSurvivorType } from "@/types/survivor.type";
import useSurvivorStore from "@/stores/survivor.store";
import { register } from "@/data/survivor";
import { useState } from "react";
const CreateSurvivorModal = () => {
  const { showCreateModal, setShowCreateModal, addSurvivor } = useSurvivorStore(
    (state) => state
  );
  const [infected, setInfected] = useState(false);

  const [form] = Form.useForm();
  const onCreate = async (values: CreateSurvivorType) => {
    const { email, firstName, lastName, age, gender, password } = values;
    try {
      const res = await register(
        email,
        password,
        firstName,
        lastName,
        age,
        infected,
        gender
      );
      addSurvivor(res);
      form.resetFields();
      setShowCreateModal(false);
      message.success("Survivor created successfully!");
    } catch (err: any) {
      message.error(err.response.data.message);
    }
  };
  return (
    <div>
      <Modal
        open={showCreateModal}
        title="Create a new survivor"
        okText="Create"
        onCancel={() => setShowCreateModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              await onCreate(values);
              //   form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input correct Email of the survivor!",
                type: "email",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input the First Name of the survivor!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input the Last Name of the survivor!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: "Please input the Age of the survivor!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="infected" valuePropName="infected">
            <Checkbox
              onChange={(e) => {
                setInfected(e.target.checked);
              }}
            >
              Check if infected!
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please input Gender of the survivor!",
              },
            ]}
          >
            {/* Select Gender */}
            <Select
              defaultValue=""
              placeholder="Select Gender"
              className="w-full"
              id="gender-select"
              allowClear
              showSearch
              options={[
                { value: "", label: "Select" },
                { value: "male", label: "Male" },
                {
                  value: "female",
                  label: "Female",
                },
                { value: "others", label: "Others" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input the Password of the survivor!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateSurvivorModal;
