import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import OrderTab from '../../components/ReadingBox/OrderTab';  
import ReadingBoxOrderShow from '../../components/ReadingBox/ReadingBoxOrderShow';  
import {  getReadingBox,getReadingBoxConfigByType ,deleteReadingBox } from "../service";
import { ReadingBoxOrderItems } from "./data";
import { PageContainer } from '@ant-design/pro-layout'; 
import { PlusOutlined } from '@ant-design/icons';
import { Button,  Space, message,DatePicker } from "antd";
import { history } from "umi";

const { RangePicker } = DatePicker;
const ReadingBoxOrderList: React.FC<{}>  = () => {  
  const [breadcrumb, setData] = useState({}); 
  const [ReadingBox, setReadingBox]  = useState({});  
  const [boxType, setBoxType]  = useState(new Map());  
  const [tableData, setTableData] = useState({});  
  const [showModalVisible, handleShowModalVisible] = useState<boolean>(
    false
  ); 
  const [rboId, setRBOId] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      //let data = await getReadingBox(0);
      //if (data !== undefined) setReadingBox(data);
      
    };
    fetchData();
  }, []);
  useEffect(() => {
      setData({ items: [
          {
            title: '共讀書箱',
          },
          {
            title: '書箱借書',
          }, 
          { 
            title:  <a href="orderlist">預約申請件</a>,    
          },
      ],});
  }, []);

 

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
      title: '書箱館藏地',
      dataIndex: 'boxKeepsiteName', 
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
      title: '申請時間', 
      dataIndex: 'insertDate', 
      hideInSearch: true, 
    },  
    { 
      title: '書箱狀態',
      dataIndex: 'boxStatus', 
      valueEnum: {   
        '0': {
          text: '在館內', 
        },
        '1': {
          text: '外借中',  
        }, 
      },
      ellipsis: true,    
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 200,
      render: (_, record: any) => { 
        return (
        <Space> 
          <Button
              type="default"
              onClick={() => {  
                setRBOId(record.rbo.id);
                handleShowModalVisible(true); 
              }}
            >
              詳細
          </Button>
          <Button
              type="default"
              onClick={async () => {  
                history.push("/readingbox/lend?readerId=" + record.readerId);
              }}
            >
            借書作業
          </Button>  
            
        </Space>);
      },
    },
  ];
  
  let title  = " "; 
  

  return (<>
  <PageContainer
      header={{
      title: title, 
      breadcrumb:  breadcrumb ,
      }}  
  > 
  <OrderTab  
    match={{ url: '/readingbox', path: '/orderlist' }}
    location={{ pathname: 'orderlist' }}
  >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
   
    <ProTable<ReadingBoxOrderItems>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return  request<{
          data: ReadingBoxOrderItems[];
        }>('../../hyreadingbox/getReadingBoxOrder?orderStatus=0', { 
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
    />
    </Space>
  </OrderTab> 
  <ReadingBoxOrderShow   
    onCancel={() => {
      handleShowModalVisible(false);  
        if (actionRef.current) actionRef.current.reload();
    }}  
    showModalVisible={showModalVisible}  
    readingBoxItems={tableData}
    rboId={rboId}
  />
  </PageContainer>  
  </>);
};
export default ReadingBoxOrderList;