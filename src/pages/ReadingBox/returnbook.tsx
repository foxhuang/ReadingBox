import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import Tab from '../../components/ReadingBox/Tab';    
import {  getAllReadingBoxOrder,deleteReadingBoxOrder  } from "../service";
import { ReadingBoxOrderItems } from "./data";
import { PageContainer } from '@ant-design/pro-layout'; 
import { ReadingBoxItems } from "./data";
 
import { Space, Alert, Divider,DatePicker, Form, Input, Row, Col,Select,Button } from "antd";
import { history } from "umi";
import { FormInstance } from "antd/lib/form";

const { RangePicker } = DatePicker;

const formRef = React.createRef<FormInstance>();

  
const formItemLayout = {
  labelCol: { span: 6 }
};
const ReturnBook: React.FC<{}>  = () => {  
  const [breadcrumb, setData] = useState({});  
  const [tableData, setTableData] = useState([]);  
  const [nextReaderName, setNextReaderName] = useState("");  
  const [errorMsg, setErrorMsg] = useState("");  
  const [boxNo, setBoxNo] = useState("");   
  const [readingboxorder, setReadingBoxOrder] = useState([{ value: 0 , label: '請選擇' }]);
  const [rboId, setRBOId] = useState(0); 
  const [rboNo, setRBONo] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => { 
        const readingboxInputs = []; 
        let response =  await getAllReadingBoxOrder();
        if (response !== undefined) {  
            response.lenddata.map((item) => { 
                readingboxInputs.push({value: "" + item.rbo.id,label: item.boxNo + "-" +item.boxTitle});
            }); 
            setReadingBoxOrder(readingboxInputs)
        }
    };
    fetchData(); 
    
  }, []);
  useEffect(() => {
      setData({ items: [
          {
            title: '共讀書箱',
          }, 
          { 
            title:  <a href="returnbook">書箱還書</a>,    
          },
      ],});
  }, []);

 
  let title  = " "; 
  const actionRef = useRef<ActionType>();  
 
  const columns: ProColumns<ReadingBoxOrderItems>[] = [
    {
      title: "#",
      dataIndex: "seq",
      hideInSearch: true,
      hideInForm: true,
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "id",
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true, 
    },
    {
      title: '代碼',
      dataIndex: 'boxNo', 
      ellipsis: true,  
      hideInSearch: true, 
    },
    { 
      title: '書箱名稱',
      dataIndex: 'boxTitle', 
      ellipsis: true,  
      hideInSearch: true, 
      width: 300,
    },
    { 
      title: '歸還結果',
      dataIndex: 'returnNote', 
      ellipsis: true,    
      hideInSearch: true, 
    }, 
    { 
      title: '讀者姓名',
      dataIndex: 'readerName',  
      ellipsis: true,    
      hideInSearch: true, 
    },   
    {
      title: '歸還時間', 
      dataIndex: 'returnDate',
      valueType: 'date', 
      hideInSearch: true,
      renderFormItem: () => <RangePicker format={"YYYY-MM-DD"}/>,
    },
    { 
      title: '預約者',
      dataIndex: "option",
      valueType: "option",
      width: 200,
      render: (_, record: any) => { 
        console.log("record",record.nextReaderName,record.boxNo);
        setNextReaderName(record.nextReaderName);
        setBoxNo(record.boxNo);
        return (<>
        <a
          href="javascript:;" 
          onClick={() => {  
            history.push("/readingbox/lend?readerId="+record.nextReaderId); 
          }}
        >
         {record.nextReaderName}
        </a>  
        </>);
      },
    }  
  ];
  

const handleRBOChange = (value: number) => {
    setRBOId(value);
};

const   returnData = async () => {
    setNextReaderName("");
    setErrorMsg("");
    setBoxNo("");
    setLoading(true);
    try {
      const response = await deleteReadingBoxOrder(rboId,rboNo);
      console.log("response :", response);   
      console.log("response.success === 0 :", response.success === 0);   
      if(response.success === 0){
        console.log("response.message :", response.message);  
        setErrorMsg(response.message);
      }else if (Array.isArray(response.data)) {
        console.log("response.data[0] :", response.data[0]);   
        let  data = [];
        data.push(...tableData,response.data[0]);
        console.log(data);   
        setTableData(data);   
        const rbo  =  await getAllReadingBoxOrder();
        if (rbo !== undefined) {
            const readingboxInputs = [{ value: 0, label: '請選擇' }];   
            rbo.lenddata.map((item) => { 
                readingboxInputs.push({value:  item.rbo.id,label: item.boxNo + "-" +item.boxTitle});
            });
            rbo.overdata.map((item) => { 
                readingboxInputs.push({value:  item.rbo.id,label: item.boxNo + "-" +item.boxTitle});
            });
            setRBONo(""); 
            setRBOId(0);
            setReadingBoxOrder(readingboxInputs)
        }
      } else {
        setTableData([]);   
      }
    } catch (error) {
        console.log("error :", error);   
    } finally {
      setLoading(false);
    }
    
};

return (<> 
    <PageContainer
        header={{
        title: title, 
        breadcrumb:  breadcrumb ,
        }} 
    >  
        <Space direction="vertical" size="middle" style={{ width: "100%" }}></Space>
        <Form<ReadingBoxOrderItems>
            {...formItemLayout}
            style={{ backgroundColor: "white", padding: "20px" }}
            ref={formRef} 
            name="control-ref"  
            labelWrap 
        >   
            <Row gutter={24}>   
                <Col span={10}>
                    <Form.Item   >
                        <Input   
                            value={rboNo} 
                            placeholder="請輸入書箱代碼"  
                            onChange={(e) => {  
                                console.log(e.target.value);
                                setRBONo(e.target.value);
                            }}
                        /> 
                    </Form.Item>  
                </Col> 
                <Col span={10}>
                    <Form.Item> 
                        <Select 
                            value={rboId} 
                            placeholder="請選擇"  
                            onChange={handleRBOChange}
                            options={readingboxorder}
                        /> 
                    </Form.Item>  
                </Col>
                <Col span={4}>
                <Form.Item style={{ textAlign: "center" }}>
                    <Space> 
                    <Button type="primary"  
                     onClick={() => {  
                        console.log("歸還");
                        returnData();
                    }}>
                        歸還 
                    </Button>  
                    </Space>
                </Form.Item>
                </Col>  
            </Row> 
        </Form>  
        <Divider />
        {nextReaderName !=="" &&  (<>
        <Alert message={"書箱代碼: "+boxNo+" 有預約讀者 : "+ nextReaderName} type="success" /><Divider />
        </>)}
        {errorMsg !=="" &&  (<>
        <Alert message={errorMsg} type="error" /><Divider />
        </>)}
        
        <ProTable<ReadingBoxOrderItems>
            columns={columns}
            actionRef={actionRef}
            cardBordered 
            dataSource={tableData}
            editable={{
                type: 'multiple',
            }}
            
            rowKey="id"  
            loading={loading}  // 載入狀態
            search={false} 
            options={{
                setting: {
                listsHeight: 400,
                },
            }} 
            pagination={{ 
                showSizeChanger: true,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"  
        /> 
    </PageContainer>
</>);
};
export default ReturnBook;