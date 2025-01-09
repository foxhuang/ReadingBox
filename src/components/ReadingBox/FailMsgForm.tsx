import request from 'umi-request';   
import React, { useEffect, useRef, useState } from "react";
import { ProTable } from '@ant-design/pro-components'; 
import type {ActionType, ProColumns } from '@ant-design/pro-components'; 
import { Button, Divider, Modal,Form, Input,  message, Space,Radio } from "antd";
import { ReadingBoxLendBookItems } from "../../pages/ReadingBox/data"; 

 
  
const FailMsgForm: React.FC<{}> = (props: any) => {
    const { failMsgVisible,lendFail,lendSuccess, onCancel,readerId,rboId} = props;   
    const actionRef = useRef<ActionType>();  
    const [tableData, setTableData] = useState({});  
    const [bstatus, setBStatus] = useState(0);  

    useEffect(() => {
        const fetchData = async () => { 
        };
        fetchData();
    }, []);
  
    const  onCancelForm=()=> {  
        onCancel();
    }

    const title = "借閱結果" ; 
   
    const columns: ProColumns<ReadingBoxLendBookItems>[] = [
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
        title: '條碼號',
        dataIndex: 'barcode', 
        ellipsis: true,  
        hideInSearch: true, 
      },
      { 
        title: '題名',
        dataIndex: 'title', 
        ellipsis: true,  
        hideInSearch: true, 
        width: 300,
      },
      { 
        title: '資料類型',
        dataIndex: 'datatype', 
        ellipsis: true,    
        hideInSearch: true, 
      },  
      { 
        title: '狀態',
        dataIndex: 'status',  
        ellipsis: true,    
        hideInSearch: true,  
      },   
      {
        title: '索書號', 
        dataIndex: 'callNumber', 
        ellipsis: true,    
        hideInSearch: true, 
      },  
      {
        title: "異常訊息",
        dataIndex: "msg",
        ellipsis: true,    
        hideInSearch: true, 
      },
    ];
    const onChange = (e: RadioChangeEvent) => {
        console.log(e.target.value);
        setBStatus(parseInt(e.target.value));
    };
    return (
    <><Modal destroyOnClose title={title} visible={failMsgVisible} onCancel={() => onCancelForm()} width={1000} footer={null}>
        <Divider /> 
        <Radio.Group  value={bstatus} onChange={onChange} style={{ marginBottom: 16 }}>
            <Radio.Button value={0}>失敗 ({lendFail})</Radio.Button>
            <Radio.Button value={1}>成功 ({lendSuccess})</Radio.Button>
        </Radio.Group>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}> 
        {bstatus===0 &&(<>
        <ProTable<ReadingBoxLendBookItems>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={(params) => {
            return  request<{
                data: ReadingBoxLendBookItems[];
            }>('../../hyreadingbox/getReadingBoxLendBook?status=0&readerId='+readerId+'&&rboId='+rboId, { 
                params,
            }).then((response) => {
                if (response.data !== undefined) {
                setTableData(response.data);
                return {
                    data: response.data,  
                    total: response.total,
                };
                } else {
                return {
                    data: [],
                    success: false,
                    total: 0,
                };
                }
            });  
            }}
            
            editable={{
            type: 'multiple',
            }}
            
            rowKey="id"  
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
        /> </>)}
        {bstatus===1 &&(<>
        <ProTable<ReadingBoxLendBookItems>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={(params) => {
            return  request<{
                data: ReadingBoxLendBookItems[];
            }>('../../hyreadingbox/getReadingBoxLendBook?status=1&readerId='+readerId+'&&rboId='+rboId, { 
                params,
            }).then((response) => {
                if (response.data !== undefined) {
                setTableData(response.data);
                return {
                    data: response.data,  
                    total: response.total,
                };
                } else {
                return {
                    data: [],
                    success: false,
                    total: 0,
                };
                }
            });  
            }}
            
            editable={{
            type: 'multiple',
            }}
            
            rowKey="id"  
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
        /> </>)}
        </Space>
    </Modal></>
    );
};

export default FailMsgForm;

 

 
