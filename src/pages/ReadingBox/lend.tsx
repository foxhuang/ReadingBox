import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import OrderTab from '../../components/ReadingBox/OrderTab';  
import {FailMsgForm} from '../../components/ReadingBox';  
import {  borrowReadingBoxBook,getReadingBoxOrder  } from "../service";
import { ReadingBoxOrderItems } from "./data";
import { PageContainer } from '@ant-design/pro-layout'; 
import { Button,  Space, Divider,DatePicker,message,Input } from "antd";
import type {RadioChangeEvent } from 'antd';
import { Radio} from 'antd';
import { history } from "umi";
import moment from "moment";
const { Search } = Input;
const { RangePicker } = DatePicker;

const ReadingBoxLend: React.FC<{}>  = () => {  
  const [breadcrumb, setData] = useState({});  
  const [tabIndex, setTabIndex] = useState("order");  
  const [initialValues, setInitialValues] = useState<any>({});
  const [maxBorrowNum , setMaxBorrowNum] = useState<any>(0);
  const [userLendNum , setUserLendNum] = useState<any>(0);
  const [readerTypeName , setReaderTypeName] = useState<any>("");
  const [RId , setRId] =  useState<any>(0);
  const [lendCnt , setLendCnt] = useState<any>(0);
  const [overCnt , setOverCnt] = useState<any>(0);
  const [orderCnt , setOrderCnt] = useState<any>(0);
  const [tableData, setTableData] = useState({});  
  const [tableLendData, setTableLendData] = useState({});  
  const [failMsgVisible, handleFailMsgModalVisible] = useState<boolean>(
    false
  ); 
  const [rboId , setRboId] = useState<any>(0); 
  const [rInfoId , setRInfoId] = useState<any>(0);
  const [lendFail , setLendFail] = useState<any>(0);
  const [lendSuccess , setLendSuccess] = useState<any>(0);
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&'); 
  let readerId = 0;
  let readerCode = "";
  params.map(param => {
    console.log("param",param);
    var q = param.split('=');
    console.log("q",q);
    if (q[0] === 'readerId') {
        readerId = parseInt(q[1]); 
        
    }else if (q[0] === 'readerCode') {
        readerCode =q[1]; 
         
    }
  });  
  useEffect(() => { 
    const fetchData = async () => {
        if (readerId <= 0 && readerCode === "") { 
            message.error("讀者不存在");
            return;
        }else{   
            let response = await getReadingBoxOrder(readerId,readerCode);
            console.log("response",response);
            if (response.reader !== undefined) {
                console.log("reader",response.reader );  
                if(response.reader === null || response.reader === undefined ){
                    message.error("讀者不存在");
                    history.push('/readingbox/lendsearch');
                    return;
                }else{ 
                    setInitialValues(response.reader||{});
                    setReaderTypeName(response.readerTypeName||"");
                    setRId(response.readerId ||0); 
                    let maxBorrowNum = response.maxBorrowNum ||0;
                    let userLendNum = response.userLendNum ||0; 
                    let ordertotal = response.ordertotal||0;
                    let lendtotal = response.lendtotal||0;
                    let overtotal = response.overtotal||0;
                    setMaxBorrowNum(maxBorrowNum);
                    setUserLendNum(userLendNum); 
                    setLendCnt(lendtotal);
                    setOverCnt(overtotal); 
                    setOrderCnt(ordertotal);
                } 
            }
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
            title: '書箱借書',
          }, 
          { 
            title:  <a href="orderlist">預約申請件</a>,    
          },
      ],});
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setTabIndex(e.target.value);
  };
  
  const onSearch = (value) => {
    console.log('輸入資料:', value); 
    window.location.href = '../readingbox/lend?readerCode='+value;
    //history.push('/readingbox/lend?readerCode='+value); 
  };
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
      title: '冊數',
      dataIndex: 'bookCnt', 
      ellipsis: true,    
      hideInSearch: true, 
    },  
    { 
      title: '書箱狀態',
      dataIndex: 'boxStatus',  
      ellipsis: true,    
      hideInSearch: true, 
      valueEnum: {   
        '0': {
          text: '在館內', 
        },
        '1': {
          text: '外借中',  
        }, 
      },
    },   
    {
      title: '申請時間', 
      dataIndex: 'insertDate', 
      hideInSearch: true, 
    },  
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 300,
      render: (_, record: any) => { 
        return (
        <Space> 
          <Button
              type="default"
              disabled={record.bookCnt === 0 ||  record.boxStatus===1 ? true:false}
              onClick={async() => {  
                const hide = message.loading("借閱中...");
                try {  
                  const result = await borrowReadingBoxBook(RId,record.rbo.id);
                  hide();
                  message.success("借閱完成");
                  setTabIndex("lend");
                  if (actionRef.current) actionRef.current.reload(); 
                } catch (error) {
                  message.success("借閱失敗請重試！");
               
                } 
              }}
            >
              借書
          </Button> 
        </Space>);
      },
    },
  ];
  

  const lendcolumns: ProColumns<ReadingBoxOrderItems>[] = [
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
      width: 150,
    },
    { 
      title: '書箱名稱',
      dataIndex: 'boxTitle', 
      ellipsis: true,  
      hideInSearch: true, 
      width: 200,
    },
    { 
      title: '冊數',
      dataIndex: 'bookCnt', 
      ellipsis: true,    
      hideInSearch: true, 
    },
    { 
      title: '借閱結果',
      width: 100,
      dataIndex: 'option',  
      valueType: "option", 
      render: (_, record: any) => { 
        return (
        <Space> 
          {(record.successCnt>0?"成功:"+record.successCnt:"")}
          <a  href="javascript:;" 
            onClick={() => {  
              console.log("record",record);
              if(record.successCnt !== record.bookCnt){
                setRboId(record.rbo.id);
                setRInfoId( record.rbo.readerId);
                setLendFail(record.failCnt);
                setLendSuccess(record.successCnt);
                handleFailMsgModalVisible(true);  
              }
           
            }}>{(record.failCnt>0?"  失敗:"+record.failCnt:"")}</a>  
        </Space>);
      },
    },     
    {
      title: '借閱日期', 
      dataIndex: 'lendDate', 
      hideInSearch: true,
      width: 150, 
    }, 
    {
      title: '應還日期', 
      dataIndex: 'returnDate', 
      hideInSearch: true,
      width: 150, 
    }, 
    {
      title: '逾期天數', 
      dataIndex: 'dueNum', 
      hideInSearch: true, 
    }, 
    {
      title: '續借次數', 
      dataIndex: 'renewCnt', 
      hideInSearch: true, 
    },  
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 100,
      render: (_, record: any) => { 
        return (
        <Space> 
          <Button
              disabled={record.successCnt === record.bookCnt ? true:false}
              type="default" 
              onClick={async() => {  
                if(record.successCnt !== record.bookCnt ){ 
                  try { 
                    const result = await borrowReadingBoxBook(RId,record.rbo.id);
                    message.success("成功");
                    if (actionRef.current) actionRef.current.reload();
                  } catch (error) {
                    message.success("失敗請重試！"); 
                  } 
                }
              }} 
            >
              調整後再借
          </Button> 
        </Space>);
      },
    },
  ];
  
  let title  = " "; 
  

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
    {(readerId > 0 || readerCode !== "") && ( <> 
    <div style={{ padding: '30px', background: '#ececec' }}>
      {JSON.stringify(initialValues) !== JSON.stringify('{}')   &&(<>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>  
        <h4>{initialValues.reader_name} {initialValues.reader_code} </h4>  
        </Space>
        <br/>  
        <Space split={<Divider type="vertical" />} size="middle">
            {`讀者類型：` + (readerTypeName ||'')}       
            {`換證次數：`+ (initialValues.seqno ||'0') }
            {`證號有效日期：` + moment(initialValues.expired_date ).format("YYYY-MM-DD HH:mm") ||''} 
            {`可借冊數：`+ ( maxBorrowNum || 0) } 
            {`已借冊數：`+ (userLendNum || 0) } 
      </Space> 
      </>)}
    </div>
    <Divider />
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
    <Divider />
    <Radio.Group  value={tabIndex} onChange={onChange} style={{ marginBottom: 16 }}>
        <Radio.Button value="order">預約申請({orderCnt})</Radio.Button>
        <Radio.Button value="lend">借閱中({lendCnt})/逾期({overCnt})</Radio.Button>
    </Radio.Group>
    {tabIndex === 'lend' && (<>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}> 
      <ProTable<ReadingBoxOrderItems>
        columns={lendcolumns}
        actionRef={actionRef}
        cardBordered
        request={(params) => {
          return  request<{
            data: ReadingBoxOrderItems[];
          }>('../../hyreadingbox/getReadingBoxOrder?orderStatus=1&readerId='+readerId+'&readerCode='+readerCode, { 
            params,
          }).then((response) => {
            console.log("response====>>",response);
            if (response.lenddata !== undefined) {
              setTableLendData(response.lenddata);
              setLendCnt(response.lendtotal||0);
              setOverCnt(response.overtotal||0);
              setOrderCnt(response.ordertotal||0);
              return {
                data: response.lenddata,  
                total: response.lendtotal,
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
    </>)}
    {tabIndex === 'order' && (<>
    <Space direction="vertical" size="middle" style={{ width: "100%" }}> 
      <ProTable<ReadingBoxOrderItems>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={(params) => {
          return  request<{
            data: ReadingBoxOrderItems[];
          }>('../../hyreadingbox/getReadingBoxOrder?orderStatus=0&readerId='+readerId+'&readerCode='+readerCode, { 
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
      </Space></>)}
    </>)}
  </OrderTab> 
  <FailMsgForm   
    onCancel={() => {
      handleFailMsgModalVisible(false);  
        if (actionRef.current) actionRef.current.reload();
    }}  
    failMsgVisible={failMsgVisible}  
    rboId={rboId}  
    readerId={rInfoId}  
    lendSuccess={lendSuccess}
    lendFail={lendFail}
  />
  </PageContainer>  
  </>);
};
export default ReadingBoxLend;