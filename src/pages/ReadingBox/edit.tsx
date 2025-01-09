import React, { useEffect, useState } from "react";
 
import { PageContainer } from '@ant-design/pro-layout';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'; 
import { Upload, message, Divider, Form, Input, Row, Col,Select,Button,Space } from "antd";
import { FormInstance } from "antd/lib/form";
import { ReadingBoxItems } from "./data";
import '../css/customButtonStyles.css';  
import { getReadingBoxConfigByType,getReadingBox, getKeepsite } from "../service";
import {  sendReadingBox  } from "../../pages/service"; 
import { history } from "umi";

const formRef = React.createRef<FormInstance>();

const formItemLayout = {
  labelCol: { span: 6 }
};
 

const AddForm: React.FC<{}> = (props: any) => {
    const [breadcrumb, setData] = useState({});  
    const [typeInput, setTypeInputs] = useState([{ value: "", label: '請選擇' }]);
    const [ksInput, setKSInputs] = useState([{ value: "", label: '請選擇' }]);
    const [gradeInput, setGradeInputs] = useState([{ value: "", label: '請選擇' }]);
    const [subjectInput, setSubjectInputs] = useState([{ value: "", label: '請選擇' }]);
    const [kindInput, setKindInputs] = useState([{ value: "", label: '請選擇' }]);
    const [proposeInput, setProposeInputs] = useState([{ value: "", label: '請選擇' }]);
    const [topicInput , setTopicInputs] = useState([{ key: 0, value: '' }]);
    const [topicInputCnts, setTopicInputsCnts] = useState(0);  
    const [fileList, setFileList] = useState([]);  
    const [fileId, setFileId] = useState(0);   
    const [readingBoxItems, setReadingBoxItems] = useState({});   
 
    let querystring = window.location.search.replace('?', '');
    let params = querystring.split('&'); 
    let id = 0;
   
    params.map(param => {
      var q = param.split('=');
      if (q[0] === 'id') {
        id = parseInt(q[1]);
      } 
    });  
    
  
    useEffect(() => {   
        const fetchData = async () => { 
          
            const typeInputs = []; 
            const ksInputs = []; 
            const gradeInputs = []; 
            const subjectInputs = []; 
            const kindInputs = [];
            const proposeInputs = []; 
       

            let readingBoxType = await getReadingBoxConfigByType("boxType");
            readingBoxType.data.map((item) => {
                typeInputs.push({value: item.id,label: item.name});
            });
            let readingBoxKS = await getKeepsite();
            readingBoxKS.data.map((item) => {
                ksInputs.push({value: item.id, label: item.name});
            }); 
            let readingBoxGrade = await getReadingBoxConfigByType("boxGrade");
            readingBoxGrade.data.map((item) => {
                gradeInputs.push({value: item.id, label: item.name});
            }); 
            let readingBoxSubject = await getReadingBoxConfigByType("boxSubject");
            readingBoxSubject.data.map((item) => {
                subjectInputs.push({value: item.id, label: item.name});
            });
            let readingBoxKind = await getReadingBoxConfigByType("boxKind");
            readingBoxKind.data.map((item) => {
                kindInputs.push({value: item.id, label: item.name});
            });
            let readingBoxPropose = await getReadingBoxConfigByType("propose");
            readingBoxPropose.data.map((item) => {
                proposeInputs.push({value: item.id, label: item.name});
            });

            
            
            setTypeInputs(typeInputs);  
            setKSInputs(ksInputs);
            setGradeInputs(gradeInputs);  
            setSubjectInputs(subjectInputs);
            setKindInputs(kindInputs);
            setProposeInputs(proposeInputs);
            if(id!==0){
                let readingBox = await getReadingBox(id);
                console.info("readingBox", readingBox.data); 
                if (readingBox.data !== undefined && readingBox.data.length > 0) {   
                    let rbItems =  readingBox.data[0] ; 
                    setTopicInputs(rbItems.box_topic.split("^Z^").map((item, index) => ({ key: index, value: item })));
                    setTopicInputsCnts(rbItems.box_topic.split("^Z^").length);
                    if(rbItems.box_imgId !== 0 && rbItems.box_imgFileName !==""){
                        let imgfilename = rbItems.box_imgFileName ;
                        let ext = imgfilename.split('.')[1];
                        setFileList([{
                            uid: rbItems.box_imgId,
                            name: 'image.'+ext,
                            status: 'done',
                            url: '../../upload/readingbox/'+imgfilename,
                        }]); 
                    }
                    console.info("rbItems  ",rbItems );  
                    setReadingBoxItems(rbItems);
                }
            }
          };
          fetchData();
        }, [id]);
    useEffect(() => {  
        setData({ items: [
            {
                title: '共讀書箱',
            }, 
            {
                title: <a href="list">書箱管理</a>,  
            },  
        ],});
    }, []);

    let title  = "新增書箱";  

    const handleBoxTypeClick = (value: number) => {
        setReadingBoxItems({ ...readingBoxItems, box_type: value });
    };
    const handleBoxGradeClick = (value: number) => {
        setReadingBoxItems({ ...readingBoxItems, box_grade : value });
    };
    const handleBoxSubjectClick = (value: number) => {
        setReadingBoxItems({ ...readingBoxItems, box_subject : value });
    };
    
    const handleBoxKSClick = (value: number) => {
        setReadingBoxItems({ ...readingBoxItems, box_keepsiteid : value });
    }; 
  
    const handleBoxKindClick = (value: number) => {
        setReadingBoxItems({ ...readingBoxItems, box_kind : value });
    };
    const handleAddProposeClick = (value: string) => {
        console.log("handleAddProposeClick",value);
        setReadingBoxItems({ ...readingBoxItems, addpropose : value });
    };
    const handleIsShowClick = (value: string) => {
        console.log("handleIsShowClick",value);
        setReadingBoxItems({ ...readingBoxItems, isshow : value });
    };
    const handleBoxTopicClick =  (key, value) => {
        const newInputs = topicInput.map(input => {
            if (input.key === key) {
                return { ...input, value };
            }
            return input;
        });
        setTopicInputs(newInputs); 
        setTopicInputsCnts(topicInputCnts+1);
    };
      
    const handleAddInput = (key) => { 
        console.info("handleAddInput inputCnts===>",key);
        const newInputs = [...topicInput , { key: topicInput.length, value: '' }];
        setTopicInputs(newInputs); 
        setTopicInputsCnts(topicInputCnts+1);
    };

    const handleDelInput = (key) => {   
      const newInputs = topicInput.filter(input => input.key !== key); 
      console.info("handleDelInput newInputs===>",topicInput);
      setTopicInputs(newInputs);
      setTopicInputsCnts(topicInputCnts-1);
    };

    const handleChange = ({ fileList: newFileList}) => { 
        console.log("newFileList",newFileList); 
        if ( newFileList.length > 0) {
            if ( newFileList.length > 1) {
                console.log(newFileList.slice(1));
                if (newFileList[1].status==="done" ) {
                    const serverResponse = newFileList.slice(1).response; 
                    console.log(serverResponse.fileId);
                    setFileId(serverResponse.fileId);
                    setFileList(newFileList.slice(1));
                    return;
                }  
            }else{
                if (newFileList[0].status==="done" ) {
                    const serverResponse = newFileList[0].response; 
                    console.log("serverResponse",serverResponse); 
                    setFileId(serverResponse.fileId);
                    setFileList(newFileList);
                    return;
                }  
            }
            setFileList(newFileList);
        }else{
            setFileList([]);
            setFileId(0);
        }
      
      };
    const imgProps = {
        fileList,
        name: 'uploadfile',
        method: 'POST',
        enctype: "multipart/form-data",
        action: '../../hyreadingbox/uploadBoxImg', 
        showUploadList: { showRemoveIcon: true ,showPreviewIcon: false},
        beforeUpload: (file:any) => { 
            console.log(file.name);
             if(file.name ===''|| (file.name.indexOf('jpg')===-1 && file.name.indexOf('png')===-1)){
              message.error(`${file.name}  檔案不符合 jpg , png要求`);
              return Upload.LIST_IGNORE;  
            }
            return true;  
        },
        onChange:handleChange, 
        onRemove: (file) => {
            setReadingBoxItems({ ...readingBoxItems,box_imgFileName : "" ,box_imgFile : "" });
            console.log("onRemove",file,readingBoxItems);
          },
    }
       
    const onFinish = async () => {
        let topicInputs = "";
        topicInput.map(input => {
            if(input.value.trim() !==""){
                topicInputs+=  input.value+"^Z^";
            } 
       });
       console.log("topicInputs",topicInputs);
       let items = readingBoxItems;
       items.box_topic = topicInputs;
       items.box_imgId = fileId;
       items.id=id; 
       console.log("onFinish",items);
       let response = await  sendReadingBox(items)
       console.log("response",response);
       if(response.success){ 
            if(id===0){
                message.success('新增成功');
            }else{
                message.success('修改成功');
            }
           history.push("/readingbox/list");
       }else{
            if(id===0){
                message.error('新增失敗');
            }else{
                message.error('修改失敗');
            }
        }
    };
       
    return ( 
        console.log("readingBoxItems.box_no="+(readingBoxItems.box_no||"")),
        console.log("readingBoxItems.addpropose ="+readingBoxItems.addpropose ),
        <>
        <PageContainer
            header={{
            title: title, 
            breadcrumb:  breadcrumb ,
            }} 
        > 
            <Form<ReadingBoxItems>
                {...formItemLayout}
                style={{ backgroundColor: "white", padding: "20px" }}
                ref={formRef}
                layout="vertical" 
                name="control-ref" 
                onFinish={onFinish} 
                labelWrap 
            >  
                <h3>書箱資訊</h3> 
                <Divider />
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item 
                            label="* 書箱條碼" 
                            rules={[{ required: true, message: '請輸入書箱條碼' }]} > 
                            <Input    
                                value={readingBoxItems.box_no||''} 
                                required
                                onChange={(e) => { 
                                    console.log(e.target.value);
                                    setReadingBoxItems({ ...readingBoxItems, box_no: e.target.value });
                                }}
                            />  
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="* 書箱類別"  
                            rules={[{ required: true, message: '請輸入書箱類別' }]} > 
                           <Select 
                                value={parseInt(readingBoxItems.box_type)||'請選擇'}
                                placeholder="請選擇"  
                                style={{ width: 300 }}
                                onChange={handleBoxTypeClick}
                                options={typeInput}
                            /> 
                        </Form.Item>  
                    </Col>  
                </Row>
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item 
                            label="* 書箱名稱"  
                            rules={[{ required: true, message: '請輸入書箱名稱' }]} >
                            <Input required
                                value={readingBoxItems.box_title||''}    
                                onChange={(e) => { 
                                    setReadingBoxItems({ ...readingBoxItems, box_title: e.target.value });
                                    console.log(e.target.value);
                                }}
                            /> 
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="* 書箱館藏地"  
                            rules={[{ required: true, message: '請輸入書箱館藏地' }]} >
                            <Select 
                                value={parseInt(readingBoxItems.box_keepsiteid)||'請選擇'}
                                placeholder="請選擇"  
                                style={{ width: 300 }}
                                onChange={handleBoxKSClick}
                                options={ksInput}
                            /> 
                        </Form.Item>  
                    </Col>  
                </Row>
                <Row gutter={24}>   
                    <Col span={8}>
                        <Form.Item 
                            label="書箱圖片" > 
                            <Upload {...imgProps}  listType="picture-card">  
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                <PlusOutlined />
                                <div
                                    style={{
                                    marginTop: 8,
                                    }}
                                >
                                支援檔案格式：jpg , png 
                                </div>
                                </button> 
                            </Upload> 
                        </Form.Item>  
                    </Col>
                    <Col span={16}>
                        <Form.Item 
                            label="書箱描述"  > 
                            <Input.TextArea  
                            value={readingBoxItems.box_description||''}
                            rows={4}   
                            onChange={(e) => { 
                                setReadingBoxItems({ ...readingBoxItems, box_description: e.target.value });
                                console.log(e.target.value);
                            }}/>
                        </Form.Item>  
                    </Col>  
                </Row>
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item  
                            label="適讀年級"   >
                           <Select 
                                value={parseInt(readingBoxItems.box_grade)||'請選擇'}
                                placeholder="請選擇"
                                style={{ width: 300 }}
                                onChange={handleBoxGradeClick}
                                options={gradeInput}
                            /> 
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item  label="適讀科目"  > 
                           <Select 
                                value={parseInt(readingBoxItems.box_subject )||'請選擇'}
                                placeholder="請選擇"   
                                style={{ width: 300 }}
                                onChange={handleBoxSubjectClick}
                                options={subjectInput}
                            /> 
                        </Form.Item>  
                    </Col>  
                </Row>  
          
                <Form.Item  label="書箱探討主題" >
                {topicInput.map((input ,index)=> (
                ((index===0)&&(<>
                    <Row  gutter={24}>
                    <Col span={20}>
                    <Input
                        key={input.key}  
                        value={input.value} 
                        onChange={e => handleBoxTopicClick(input.key, e.target.value)}
                    />
                    </Col>
                    <Col span={4}> 
                    <Button  style={{  margin: '0 0 0 10px'}} 
                         onClick={() => handleAddInput(input.key)}>
                        <PlusOutlined   />
                    </Button></Col></Row>
                    </>))||
                    ((index>0)&&(<>
                    <Row  gutter={24}>
                    <Col span={20}>
                    <Input
                        key={input.key} 
                        value={input.value} 
                        onChange={e => handleBoxTopicClick(input.key, e.target.value)}
                    /></Col>
                    <Col span={4}> 
                    <Button  style={{  margin: '0 0 0 10px'}} 
                            onClick={() =>handleDelInput(input.key)}>
                        <CloseOutlined   />
                    </Button></Col>
                    </Row></>))  
                ))}
          
                </Form.Item>   
            
                <Divider />
                <h3>書箱設定</h3> 
                <Divider />
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item 
                            label="* 是否顯示於前台"  
                            rules={[{ required: true, message: '請輸入是否顯示於前台' }]} > 
                           <Select 
                                value={readingBoxItems.isshow}
                                placeholder="請選擇"
                                style={{ width: 300 }}
                                onChange={handleIsShowClick}
                                options={[
                                    { value: 1, label: '是' },
                                    { value: 0, label: '否' }, 
                                  ]}
                            /> 
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="* 書箱性質"  
                            rules={[{ required: true, message: '請輸入書箱性質' }]} > 
                           <Select 
                                value={parseInt(readingBoxItems.box_kind)||'請選擇'}
                                placeholder="請選擇"
                                style={{ width: 300 }}
                                onChange={handleBoxKindClick}
                                options={kindInput}
                            /> 
                        </Form.Item>  
                    </Col>  
                </Row>
                <Row gutter={24}>   
                    <Col span={12}>
                        <Form.Item 
                            label=" 用途書" > 
                           <Select  
                                value={parseInt(readingBoxItems.addpropose )|| "請選擇"  }
                                placeholder="請選擇"
                                style={{ width: 300 }}  
                                onChange={handleAddProposeClick}
                                options={proposeInput}
                            /> 
                        </Form.Item>  
                    </Col>
                    <Col span={12}>
                        <Form.Item 
                            label="* 借閱天數"  
                            rules={[{ required: true, message: '請輸入借閱天數' }]} > 
                            <Input required 
                                readOnly={readingBoxItems.box_status=== 1 ? true : false}
                                value={readingBoxItems.borrow_days||''}        
                                onChange={(e) => { 
                                    setReadingBoxItems({ ...readingBoxItems, borrow_days: parseInt(e.target.value) });
                                    console.log(e.target.value);
                                }}
                            /> 
                        </Form.Item>  
                    </Col>  
                </Row>
                <Divider />
                <Form.Item style={{ textAlign: "center" }}>
                    <Space> 
                    <Button type="default"   
                     onClick={() => {  
                        history.push("/readingbox/list");
                    }}>
                        回書箱列表
                    </Button> 
                    {(id!==0) && (
                    <Button type="default"   
                     disabled={parseInt(readingBoxItems.box_status) !== 0}
                     onClick={() => {  
                        history.push("/readingbox/addbook?rbId=" + id);
                    }}>
                        新增書箱資料
                    </Button> 
                    )}
                    <Button type="primary" htmlType="submit">
                        完成 
                    </Button> 
                 
                    </Space>
                </Form.Item>
            </Form> 
        </PageContainer></>
    );
};

export default AddForm;
