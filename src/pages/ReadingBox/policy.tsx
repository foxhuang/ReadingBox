import React, { useEffect, useRef, useState } from "react";
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer  } from '@ant-design/pro-layout'; 
import { Space, message, Divider, Form, Input, Row, Col,Select,Button } from "antd";
import { FormInstance } from "antd/lib/form";
import { ReadingBoxItems } from "./data";
import '../css/customButtonStyles.css';  
import { sendReadingBoxOrderAndReNewCnt,getReadingBoxOrderAndReNewCnt  } from "../service"; 
import Tab from '../../components/ReadingBox/Tab';  

const formRef = React.createRef<FormInstance>();

  
const formItemLayout = {
  labelCol: { span: 6 }
};
  
const Policy: React.FC<{}> = (props: any) => {
    const [breadcrumb, setData] = useState({}); 
    const [initialValues, setInitialValues] = useState<any>({}); 
    const actionRef = useRef<ActionType>(); 
  
    useEffect(() => {   
        const fetchData = async () => { 
            let response = await getReadingBoxOrderAndReNewCnt();
            if (response !== undefined) {
                setInitialValues(response.data);
            }
        };
        fetchData(); 
        
        setData({ items: [
            {
                title: '共讀書箱',
            },
            {
                title:  <a href="list">書箱管理</a>,    
            }, 
            {
                title: <a href="policy">書箱政策</a>,  
            },  
        ],});
    }, []);

    let title  = "";  
 
    const handleorderCntChange = (value:number) => { 
        console.log("value",value);
        setInitialValues({...initialValues,orderCnt:value});
    }; 

    const handlerenewCntChange = (value:number) => { 
        console.log("value",value);
        setInitialValues({...initialValues,renewCnt:value});
    }; 

    const onFinish = async () => { 
        console.log("initialValues",initialValues); 
        if (await sendReadingBoxOrderAndReNewCnt(initialValues)) {
            message.success("新增成功"); 
        } else {
            message.error("新增失敗");
        }
        if (actionRef.current) actionRef.current.reload();
        
    };

    return (  
        <>
        <PageContainer
            header={{
            title: title, 
            breadcrumb:  breadcrumb ,
            }} 
        > 
        <Tab  
            match={{ url: '/readingbox', path: '/policy' }}
            location={{ pathname: 'policy' }}
        >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}></Space>
        <Form<ReadingBoxItems>
                {...formItemLayout}
                style={{ backgroundColor: "white", padding: "20px" }}
                ref={formRef} 
                name="control-ref" 
                onFinish={onFinish} 
                labelWrap 
            >   
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item 
                            label="* 總計可預約箱數"  
                            rules={[{ required: true, message: '請輸入總計可預約箱數' }]} >
                            <Input required
                                value={initialValues.orderCnt|| 0}    
                                onChange={(e) => { 
                                      console.log(e.target.value);
                                      handleorderCntChange(e.target.value);
                                }}
                            /> 
                        </Form.Item>  
                    </Col>
                </Row>
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item 
                            label="* 每箱可續借次數"  
                            rules={[{ required: true, message: '請輸入每箱可續借次數' }]} >
                             <Input required
                                value={ initialValues.renewCnt|| 0}    
                                onChange={(e) => { 
                                     console.log(e.target.value);
                                     handlerenewCntChange(e.target.value);
                                }}
                            /> 
                        </Form.Item>  
                    </Col>  
                </Row>
                  
                <Divider />
                <Form.Item style={{ textAlign: "center" }}>
                    <Space> 
                    <Button type="primary" htmlType="submit">
                        完成 
                    </Button>  
                    </Space>
                </Form.Item>
            </Form>  
        </Tab> 
    </PageContainer></>
    );
};

export default Policy;
