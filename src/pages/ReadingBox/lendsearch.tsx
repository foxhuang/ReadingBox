import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import OrderTab from '../../components/ReadingBox/OrderTab';   
import { PageContainer } from '@ant-design/pro-layout'; 
 
import { Button,  Space, Divider,DatePicker,message,Input } from "antd";
const { Search } = Input;
import { history } from "umi";  

const LendSearch: React.FC<{}>  = () => {  
  const [breadcrumb, setData] = useState({}); 
  const [inputs, setInputs] = useState("");
  useEffect(() => { 
    const fetchData = async () => { 
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
   
   
  
  let title  = " "; 
  
  const onSearch = (value) => {
    console.log('輸入資料:', value); // 在這裡可以處理輸入的資料
    history.push('/readingbox/lend?readerCode='+value); 
  };
  return ( 
  <>
  <PageContainer
      header={{
      title: title, 
      breadcrumb:  breadcrumb ,
      }}  
  > 
  <OrderTab  
    match={{ url: '/readingbox', path: '/lendsearch' }}
    location={{ pathname: 'lendsearch' }}
  > 
  <div style={{ padding: '30px', background: '#ececec' }}>
    <Space style={{ width: '100%' }}>
      <Search
        placeholder="請輸入讀者證號/姓名/身分證號"
        allowClear
        enterButton="查詢"
        size="large"
        style={{ width: 600 }}   
        onSearch={onSearch}
      /> 
    </Space> 
  </div>
  </OrderTab> 
  </PageContainer>  
  </>);
};
export default LendSearch;