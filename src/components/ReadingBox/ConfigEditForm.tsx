import request from 'umi-request';   
import React, { useEffect, useRef, useState } from "react";
import { ProTable } from '@ant-design/pro-components'; 
import type {ActionType, ProColumns } from '@ant-design/pro-components';
import { ReadingBoxConfigItem } from "../../pages/ReadingBox/data"; 
import {   getReadingBoxConfigByTypeAndId ,sendReadingBoxConfig } from "../../pages/service"; 
import { Button, Divider, Modal,Form, Input,  message, Space,Radio } from "antd";
import moment from "moment";
import { FormInstance } from "antd/lib/form";
 

const formRef = React.createRef<FormInstance>();

 
const formItemLayout = {
    labelCol: { span: 3 }
  };
  
const ConfigEditForm: React.FC<{}> = (props: any) => {
    const { editModalVisible, onCancel,id,type,typeName} = props;  
    console.info("id", id); 
    const actionRef = useRef<ActionType>(); 
    const [initialValues, setInitialValues] = useState<any>({});
 
    useEffect(() => {
        const fetchData = async () => {
            if (id !== 0) {
                let items = await getReadingBoxConfigByTypeAndId(type,id); 
                console.info("items", items); 
                console.info("items data", items.data); 
                if (items !== undefined) {  
                    let item = items.data[0];
                    console.info("items data name", item.name); 
                    let insert_muser_name =  items.muser.filter(d => (d.id === item.insert_muser_id)).map((item) => { 
                        return item.name; 
                    });
                    let update_muser_name =  items.muser.filter(d => (d.id === item.insert_muser_id)).map((item) => { 
                         return item.name;
                    }); 
                  
                    setInitialValues({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        type: type,
                        tw: item.tw,
                        ch: item.ch,
                        en: item.en,
                        jp: item.jp, 
                        inUse: item.inUse,
                        insert_muser_name: insert_muser_name,
                        insert_date: moment(item.insert_date).format("YYYY-MM-DD HH:mm"),
                        update_muser_name: update_muser_name,
                        update_date: moment(item.update_date).format("YYYY-MM-DD HH:mm"),
                    });
                 
                }; 
            }else{
                setInitialValues({ 
                    name: "",
                    code:"",
                    zh:"",
                    en: "",
                    jp: "",
                    ch: "",
                    inUse: 1, 
                });  
            }
        };
        fetchData();
    }, [id]);
  
    const  onCancelForm=()=> { 
        setInitialValues({ 
            name: "",
            code:"",
            zh:"",
            en: "",
            jp: "",
            ch: "",
            inUse: 1, 
        });   
        onCancel();
    }

    const title = (id===0) ? " 新增  " :" 編輯  " ;
 
    const onFinish = async () => { 
        console.log("initialValues",initialValues);
        initialValues.type=type;
        if (await sendReadingBoxConfig(initialValues)) {
            message.success("新增成功");
            onCancelForm();
        } else {
            message.error("新增失敗");
        }
        
    };
 
    const handleTWChange = (value) => { 
        console.log("value",value);
        setInitialValues({...initialValues,name:value,tw:value});
    }; 
    const handleCHChange = (value) => { 
        console.log("value",value);
        setInitialValues({...initialValues,ch:value});
    }; 
    const handleENChange = (value) => { 
        console.log("value",value);
        setInitialValues({...initialValues,en:value});
    }; 
    const handleJPChange = (value) => { 
        console.log("value",value);
        setInitialValues({...initialValues,jp:value});
    };  
    const handleCodeChange = (value) => { 
        console.log("value",value);
        setInitialValues({...initialValues,code:value});
    }; 
    const handleInUseChange = (value) => { 
        console.log("value",value);
        setInitialValues({...initialValues,inUse:value});
    }; 

    return (
        <>
        <Modal destroyOnClose title={title} visible={editModalVisible} onCancel={() => onCancelForm()} width={1000} footer={null}>
            <Form<ReadingBoxConfigItem>
                {...formItemLayout}
                style={{ backgroundColor: "white", padding: "20px" }}
                ref={formRef}
                name="control-ref" 
                onFinish={onFinish} 
                labelWrap
            >
            <h3>{typeName}</h3>
            <Divider />
            <Form.Item label="* 前台顯示" >
            <Radio.Group
              onChange={(e) => {
                handleInUseChange(e.target.value);
              }}
              value={initialValues.inUse}
            >
              <Radio value={0}>否</Radio>
              <Radio value={1}>是</Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item label="* 類別代碼" >
            {id!==0 ?(<>{initialValues.code}</>) :(
                <Input   required
                    onChange={(e) => { 
                        handleCodeChange(e.target.value);
                    }}
                /> 
            )}
            </Form.Item>
            <Divider />
            <h4>類別名稱</h4>
            <Divider />
            <Form.Item label=" 繁體中文" >
            <Input value={initialValues.tw||''}   required
                onChange={(e) => { 
                    handleTWChange(e.target.value);
                }}
            /> 
            </Form.Item>
            <Form.Item label=" 簡體中文" >
            <Input value={initialValues.ch||''}   
                onChange={(e) => { 
                    handleCHChange(e.target.value);
                }}
            /> 
            </Form.Item>
            <Form.Item label=" 英文" >
            <Input value={initialValues.en||''}   
                onChange={(e) => { 
                    handleENChange(e.target.value);
                }}
            /> 
            </Form.Item>
            <Form.Item label=" 日文" >
            <Input value={initialValues.jp||''}   
                onChange={(e) => { 
                    handleJPChange(e.target.value);
                }}
            /> 
            </Form.Item>
           
            <Divider />
            {(id !== 0) ? ( <>
                <h4>新增/修改記錄</h4>
                <Space split={<Divider type="vertical" />} size={50}>
                    {`新增人員：` + initialValues.insert_muser_name}
                    {`新增時間：` + initialValues.insert_date}
                </Space>{"  "}
                <Space split={<Divider type="vertical" />} size={50}>
                    {`修改人員：` + initialValues.update_muser_name}
                    {`修改時間：` + initialValues.update_date}
                </Space>
                <Divider /></>
            ) : (
                <></>
            )} 
            <Form.Item style={{ textAlign: "center" }}>
                <Space>
                <Button type="default" onClick={() => onCancelForm()}>
                 關閉
                </Button>
                <Button type="primary" htmlType="submit">
                    送出
                </Button>
                </Space>
            </Form.Item> 
        </Form> 
        </Modal></>
    );
};

export default ConfigEditForm;

 

 
