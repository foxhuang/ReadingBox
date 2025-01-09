import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react"; 
import { getReadingBox ,addReadingBoxBookByBarcode,deleteReadingBoxBook} from "../service";
import { ReadingBoxConfigItem } from "./data";
import { DownloadOutlined,UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';  
import { Button,Card,Form, Input, Upload,   Space, message ,Divider,Row,Col} from "antd";
import { history } from "umi";
import { UploadMessageForm } from '../../components/ReadingBox'; 

const AddBook: React.FC<{}>  = () => {  
    let querystring = window.location.search.replace('?', '');
    let params = querystring.split('&');
    let rbId = 0;
    params.map(param => {
      var q = param.split('=');
      if (q[0] === 'rbId') {
        rbId = parseInt(q[1]);
      } 
    }); 
      
  const [breadcrumb, setData] = useState({});    
  const [id, setId] = useState(0);  
  const [type, setType] = useState("");   
  const [initialValues, setInitialValues] = useState<any>({});
  const [startBarcode, setStartBarcode] = useState<any>(""); 
  const [endBarcode, setEndBarcode] = useState<any>(""); 
  const [files, setFiles] = useState<any[]>([]);
  const [modalVisible, handleModalVisible] = useState<boolean>(
    false
  ); 
  useEffect(() => {
    const fetchData = async () => { 
        let readingBox = await getReadingBox(rbId); 
        if (readingBox !== undefined) { 
            console.info("readingBox", readingBox.data); 
            setInitialValues(readingBox.data[0]); 
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
            title:  <a href="list">書箱管理</a>,    
          }, 
          { 
            title: <a href="addbook">新增書箱資料</a>,   
          },
      ],});
  }, []);

  const handlerStartBarcodeChange = (value:any) => { 
    console.log("value",value);
    setStartBarcode(value);
  }; 
  
  const handlerEndBarcodeChange = (value:any) => { 
    console.log("value",value);
    setEndBarcode(value);
  };


  const actionRef = useRef<ActionType>();  

  const handlerSubmit= async () => {  
    let response = await  addReadingBoxBookByBarcode(rbId,startBarcode,endBarcode);
    console.log("response",response);
    if(response.success==="1"){
        message.success("新增成功"); 
        if (actionRef.current) actionRef.current.reload();
    }else{ 
        message.error("新增失敗");
    }
  };


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
      title: '題名',
      dataIndex: 'title', 
      ellipsis: true,  
      hideInSearch: true,
      width: 300,
    },
    { 
      title: '條碼號',
      dataIndex: 'barcode', 
      hideInSearch: true,
      ellipsis: true,  
    },
    { 
      title: '作者',
      dataIndex: 'author', 
      hideInSearch: true,
      ellipsis: true,   
    },  
    { 
        title: '資料類型',
        dataIndex: 'boxType', 
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
        title: '狀態',
        dataIndex: 'status', 
        hideInSearch: true,
        ellipsis: true,    
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
              danger
              onClick={async () => {
                if (confirm("確定刪除嗎？")) { 
                  const hide = message.loading("正在配置");
                  try {
                    const result = await deleteReadingBoxBook(record.id);
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
  
  let title  = "新增書箱資料 "; 

  const handleChange = ({ fileList: newFileList}) => { 
    console.log(newFileList);  
    if ( newFileList.length > 0) { 
        if (newFileList[newFileList.length-1].status==="done" ) {
            const serverResponse = newFileList[newFileList.length-1].response; 
            console.log(serverResponse);  
            let files=[];
            files.push(serverResponse);
            setFiles(files); 
            if (actionRef.current) actionRef.current.reload();
            return;
        }    
    }
  };


  const props = { 
    name: 'uploadfile',
    method: 'POST',
    enctype: "multipart/form-data",
    action: '../../hyreadingbox/uploadBookFile', 
    showUploadList: false,
    data: {
      rbId: rbId, 
    },
    beforeUpload: (file:any) => { 
        console.log(file.name);
         if(file.name ===''|| (file.name.indexOf('xlsx')===-1 )){
          message.error(`${file.name}  檔案不符合 xlsx 要求`);
          return Upload.LIST_IGNORE;  
        }
        return true;  
    },
    onChange:handleChange, 
}

return (<>
    <PageContainer
        header={{
        title: title, 
        breadcrumb:  breadcrumb ,
        }}  
    >    
    <div style={{ padding: '30px', background: '#ececec' }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}> 
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>{ initialValues.box_title}</h4> 
        <Button 
            onClick={() => {  
                history.push("/readingbox/edit?id=" + rbId);
            }}
        >
            修改書箱資訊
        </Button>
        </div>      
        </Space>
        <br/> <br/>
        <Space split={<Divider type="vertical" />} size="middle">
            {`書箱代碼：` + (initialValues.box_no ||'')}       
            {`是否顯示於前台：`+ ((initialValues.isshow || '1') ==='1'  ? "是" : "否")}
            {`書籍狀態：` + ((initialValues.box_status || '0') ==='1'  ? "已借出" : "在館內")} 
            {`修改書箱館藏地：`+ (initialValues.box_keepsiteName ||'') } 
        </Space>   
        </div>
        <Divider />
        <Row gutter={24}>   
        <Col span={16}>
        <Card style={{ width:"100%" }}>
        <Form.Item 
            label=" 請刷入或輸入條碼號"  
            rules={[{ required: true, message: '請刷入或輸入條碼號' }]} >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                    style={{
                    width: '45%',
                    marginRight: '10px'
                    }} 
                    onChange={(e) => { 
                      console.log(e.target.value);
                      handlerStartBarcodeChange(e.target.value);
                   }}
                />
                <div style={{ margin: '0 10px', fontSize: '18px' }}>~</div> 
                <Input
                    style={{
                    width: '45%'
                    }} 
                    onChange={(e) => { 
                      console.log(e.target.value);
                      handlerEndBarcodeChange(e.target.value);
                   }}
                /> 
                <div style={{ margin: '0 10px', fontSize: '18px' }}> </div> 
                <Button
                    type="primary"
                    onClick={() => {
                      handlerSubmit();   
                    }}
                >
                    新增
                </Button>
            </div>    
        </Form.Item>  
        </Card>
        </Col>
        <Col span={8}>
        <Card style={{ width:"100%" }}> 
            <Space split={<Divider type="vertical" />} size="middle">
                <Row>  
                <Col>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>上傳文件</Button>
                </Upload>
                </Col> 
                {files.map((file) => {  
                  return (<>   
                    <Col>{file.fileName} 
                    {file.failMsg!==""&&
                        <Button  
                        type="primary" 
                        size="small"
                        onClick={() => {    
                            handleModalVisible(true);
                        }}
                    >檢視結果</Button>
                    }</Col>
                  </>);
                })}
                </Row>  
                <Row>  
                <Col>
                <Button type="primary"  onClick={() => { 
                    window.location.href = '../清單匯入範本.xlsx';
                }}
                icon={<DownloadOutlined />}>
                    範例檔下載
                </Button>
                </Col> 
                </Row>
            </Space>
            <p className="ant-upload-hint"> 支援檔案格式：xlxs </p>     
        </Card>
        </Col>
        </Row>
        <UploadMessageForm   
            onCancel={() => {
                handleModalVisible(false);   
            }}  
            modalVisible={modalVisible}  
            data={files} 
            index={0} 
            label01="檔名"
        />    
        <Divider />
        <ProTable<ReadingBoxConfigItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered  
        request={(params) => {
            return  request<{
            data: ReadingBoxConfigItem[];
            }>('../../hyreadingbox/getReadingBoxBook?rbId='+rbId, { 
            params,
            }).then((response) => {
            if (response.data !== undefined) { 
                return {
                data: response.data, 
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
        search={{
            labelWidth: 'auto',
        }} 
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
    </PageContainer>  
</>);
};
export default AddBook;