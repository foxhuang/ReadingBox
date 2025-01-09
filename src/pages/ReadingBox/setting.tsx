import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import {Tab,ConfigEditForm} from '../../components/ReadingBox';  
import { deleteReadingBoxConfig } from "../service";
import { ReadingBoxConfigItem } from "./data";
import { PageContainer } from '@ant-design/pro-layout';  
import { Button,  Space, message ,Divider} from "antd";
import { history } from "umi";
 
const ReadingBoxSetting: React.FC<{}>  = () => {  
  const [breadcrumb, setData] = useState({});  
  const [id, setId] = useState(0);  
  const [type, setType] = useState("");  
  const [typeName, setTypeName] = useState("");  
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(
    false
  ); 
  
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
            title:  <a href="list">書箱管理</a>,    
          }, 
          { 
            title: <a href="setting">書箱設定</a>,   
          },
      ],});
  }, []);

 

  const actionRef = useRef<ActionType>(); 
  

 
  const columns: ProColumns<ReadingBoxConfigItem>[] = [
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
      dataIndex: 'code', 
      ellipsis: true,  
      hideInSearch: true,
      width: 300,
    },
    { 
      title: '類別名稱',
      dataIndex: 'name', 
      hideInSearch: true,
      ellipsis: true,  
    },
    { 
      title: '是否啟用',
      dataIndex: 'inUse', 
      hideInSearch: true,
      ellipsis: true,   
      valueEnum:{   
        '0': {
          text: '否', 
        },
        '1': {
          text: '是',  
        }, 
      },
    },   
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 300,
      render: (_, record: any) => { 
        return (<Space>  
          <Button
              type="default"
              onClick={() => {   
                    setId(record.id);
                    setType(record.type);
                    setTypeName(record.type==="boxSubject"?"適讀科目":"書箱類別");
                    handleEditModalVisible(true);
                }}
            >
            修改
          </Button>   
          <Button
              type="default"
              danger
              onClick={async () => {
                if (confirm("確定刪除嗎？")) { 
                  const hide = message.loading("正在配置");
                  try {
                    const result = await deleteReadingBoxConfig(record.id);
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
  > 
  <Tab  
    match={{ url: '/readingbox', path: '/setting' }}
    location={{ pathname: 'setting' }}
  >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
    <h4>書箱類別</h4>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
            type="primary"
            onClick={() => {  
                setType("boxType");
                setId(0);
                setTypeName("書箱類別")
                handleEditModalVisible(true);
            }}
        >
            新增
        </Button>
    </div>
    <ProTable<ReadingBoxConfigItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered  
      request={(params) => {
        return  request<{
          data: ReadingBoxConfigItem[];
        }>('../../hyreadingbox/getReadingBoxConfigByType?type=boxType', { 
          params,
        }).then((response) => {
          if (response.data !== undefined) { 
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
      search={false} 
      rowKey="id"   
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
    <Divider /> 
    <h4>適讀科目</h4>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
            type="primary"
            onClick={() => {  
                setType("boxSubject");
                setId(0);
                setTypeName("適讀科目")
                handleEditModalVisible(true);
            }}
        >
            新增
        </Button>
    </div>
    <ProTable<ReadingBoxConfigItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered  
      request={(params) => {
        return  request<{
          data: ReadingBoxConfigItem[];
        }>('../../hyreadingbox/getReadingBoxConfigByType?type=boxSubject', { 
          params,
        }).then((response) => {
          if (response.data !== undefined) { 
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
      search={false} 
      rowKey="id"   
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
  <ConfigEditForm   
    onCancel={() => {
        handleEditModalVisible(false);  
        if (actionRef.current) actionRef.current.reload();
    }}  
    editModalVisible={editModalVisible}  
    id={id} 
    type={type} 
    typeName={typeName}
  />
  </PageContainer>  
  </>);
};
export default ReadingBoxSetting;