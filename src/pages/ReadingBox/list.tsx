import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import Tab from '../../components/ReadingBox/Tab';  
import ReadingBoxShow from '../../components/ReadingBox/ReadingBoxShow';  
import {  getReadingBox,getReadingBoxConfigByType ,deleteReadingBox } from "../service";
import { ReadingBoxItems } from "./data";
import { PageContainer } from '@ant-design/pro-layout'; 
import { PlusOutlined } from '@ant-design/icons';
import { Button,  Space, message,DatePicker } from "antd";
import { history } from "umi";

const { RangePicker } = DatePicker;
const ReadingBoxList: React.FC<{}>  = () => {  
  const [breadcrumb, setData] = useState({}); 
  const [ReadingBox, setReadingBox]  = useState({});  
  const [boxType, setBoxType]  = useState(new Map());  
  const [tableData, setTableData] = useState({});  
  const [showModalVisible, handleShowModalVisible] = useState<boolean>(
    false
  ); 
  const [rbId, setRBId] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      let data = await getReadingBox(0);
      if (data !== undefined) setReadingBox(data);
      let boxType= new Map();
      let readingBoxType = await getReadingBoxConfigByType("boxType");
      readingBoxType.data.map((item) => {
        boxType.set(item.id, item.name);
      });
      setBoxType(boxType);
    };
    fetchData();
  }, []);
  useEffect(() => {
      setData({ items: [
          {
            title: '共讀書箱',
          },
          {
            title: '書箱管理',
          }, 
          { 
            title:  <a href="list">書箱列表</a>,    
          },
      ],});
  }, []);

 

  const actionRef = useRef<ActionType>(); 
  

 
  const columns: ProColumns<ReadingBoxItems>[] = [
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
      dataIndex: 'box_no', 
      ellipsis: true,  
      hideInSearch: true,
      width: 150,
    },
    { 
      title: '書箱名稱',
      dataIndex: 'box_title', 
      ellipsis: true,  
    },
    { 
      title: '書箱類別',
      dataIndex: 'box_type', 
      ellipsis: true,   
      valueEnum: boxType,
    },  
    { 
      title: '書箱狀態',
      dataIndex: 'box_status', 
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
      title: '應還日期',
      key: 'return_date',
      dataIndex: 'return_date',
      valueType: 'date', 
      hideInSearch: true,
      renderFormItem: () => <RangePicker format={"YYYY-MM-DD"}/>,
    },  
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 350,
      render: (_, record: any) => { 
        return (
        <Space> 
          <Button
              type="default"
              onClick={() => {  
                setRBId(record.id);
                handleShowModalVisible(true);  
              }}
            >
              詳細
          </Button>
          <Button
              type="default"
              onClick={async () => {
                history.push("/readingbox/edit?id=" + record.id);
              }}
            >
            修改
          </Button>  
          <Button
              type="default"
              disabled={parseInt(record.box_status) !== 0}
              onClick={async () => {
                history.push("/readingbox/addbook?rbId=" + record.id);
              }}
            >
            新增書箱資料
          </Button>   
          <Button
              type="default"
              disabled={parseInt(record.box_status) !== 0}
              onClick={async () => {
                if (parseInt(record.box_status) === 0 && confirm("確定刪除嗎？")) { 
                  const hide = message.loading("正在配置");
                  try {
                    const result = await deleteReadingBox(record.id);
                    hide(); 
                    message.success("刪除成功");
                    if (actionRef.current) actionRef.current.reload();
                  } catch (error) {
                    message.success("刪除失敗請重試！");
                    hide();
                  } 
                }
              }}
            >
              刪除
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
      extra={[(<>
        <Button
          type="primary" 
          onClick={() => {   
            history.push("/readingbox/edit");
          }}
        >
          <PlusOutlined /> 新建
        </Button>   
      </>)]}
  > 
  <Tab  
    match={{ url: '/readingbox', path: '/list' }}
    location={{ pathname: 'list' }}
  >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
   
    <ProTable<ReadingBoxItems>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return  request<{
          data: ReadingBoxItems[];
        }>('../../hyreadingbox/getReadingBox', { 
          params,
        }).then((response) => {
          if (response.data !== undefined) {
            setTableData(response.data);
            return {
              data: response.data,
              muser: response.muser,
              success: response.success,
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
      search={{
        labelWidth: 'auto',
      }} 
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
  </Tab> 
  <ReadingBoxShow   
    onCancel={() => {
      handleShowModalVisible(false);  
        if (actionRef.current) actionRef.current.reload();
    }}  
    showModalVisible={showModalVisible}  
    readingBoxItems={tableData}
    rbId={rbId}
  />
  </PageContainer>  
  </>);
};
export default ReadingBoxList;