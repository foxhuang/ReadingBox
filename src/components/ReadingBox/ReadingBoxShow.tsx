import React, { useEffect, useRef, useState } from "react"; 
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Divider,Modal, Form,Row,Col } from "antd";
import request from 'umi-request'; 
import { ReadingBoxConfigItem } from "../../pages/ReadingBox/data";
import { ProTable } from '@ant-design/pro-components'; 
import { getReadingBoxConfigByType,getKeepsite  } from "../../pages/service";
import '../../pages/css/customButtonStyles.css';  
import moment from "moment";
  
const ReadingBoxShow: React.FC<{}> = (props: any) => {
    const { showModalVisible, onCancel,readingBoxItems,rbId} = props;  
    const [readingBoxItem, setReadingBoxItems] = useState({}); 
    const [typeMap, setTypeMap] = useState(new Map<number,string>()); 
    const [ksMap, setKSMap] = useState(new Map<number,string>()); 
    const [gradeMap, setGradeMap] = useState(new Map<number,string>()); 
    const [subjectMap, setSubjectMap] = useState(new Map<number,string>());  
    const [kindMap, setKindMap] = useState(new Map<number,string>()); 
    const actionRef = useRef<ActionType>();  
    console.log("rbId",rbId);

    useEffect(() => {  
        const fetchData = async () => { 
            console.log("readingBoxItems=",readingBoxItems); 
            const typeInputs = new Map<number,string>();
            let readingBoxType = await getReadingBoxConfigByType("boxType");
            readingBoxType.data.map((item) => {
                typeInputs.set(item.id,item.name);
            });
            setTypeMap(typeInputs);
            
            const ksInputs = new Map<number,string>();
            let readingBoxKS = await getKeepsite();
            readingBoxKS.data.map((item) => {
                ksInputs.set(item.id,item.name);
            }); 
            setKSMap(ksInputs);

            const gradeInputs = new Map<number,string>();
            let readingBoxGrade = await getReadingBoxConfigByType("boxGrade");
            readingBoxGrade.data.map((item) => {
                gradeInputs.set(item.id,item.name);
            }); 
            setGradeMap(gradeInputs);

            const subjectInputs = new Map<number,string>();
            let readingBoxSubject = await getReadingBoxConfigByType("boxSubject");
            readingBoxSubject.data.map((item) => {
                subjectInputs.set(item.id,item.name);
            });
            setSubjectMap(subjectInputs);

            const kindInputs = new Map<number,string>();
            let readingBoxKind = await getReadingBoxConfigByType("boxKind");
            readingBoxKind.data.map((item) => {
                kindInputs.set(item.id,item.name);
            }); 
            setKindMap(kindInputs);

            console.log("readingBoxItems==>",readingBoxItems);
            if(readingBoxItems.length > 0){
                readingBoxItems.map((item) => {
                    console.log("item===>",item);
                    if(item.id === rbId){
                        console.log("item",item);
                        setReadingBoxItems(item);
                    }
                });  
            }
        };
        fetchData();
    },[rbId]); 

    

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
    ];
    return (
        <> 
        <Modal destroyOnClose title={"書箱資訊"} visible={showModalVisible} onCancel={() => onCancel()} width={1000} footer={null}>
        {readingBoxItem.box_imgFileName && (<>
        <Row gutter={24}>   
            <Col span={12}> 
            <Form.Item  label="書箱圖片">  
                <img src={readingBoxItem.box_imgFile} width="50%" />
            </Form.Item>  
            </Col>
        </Row>
        </>)} 
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item    label="書箱條碼">  
                {readingBoxItem.box_no}   
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item     label="書箱類別"> 
                    {typeMap.size > 0 && (typeMap.get(parseInt(readingBoxItem.box_type))|| "")} 
                </Form.Item>  
            </Col>  
        </Row>
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item  label="書箱名稱">
                   {readingBoxItem.box_title}    
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item   label="書箱館藏地">
                 {ksMap.size > 0 && (ksMap.get(parseInt(readingBoxItem.box_keepsiteid))|| "")} 
                </Form.Item>  
            </Col>  
        </Row>
        <Row gutter={24}>   
            <Col span={24}>
                <Form.Item  label="書箱描述"> 
                    {readingBoxItem.box_description } 
                </Form.Item>  
            </Col>   
        </Row>
        <Row gutter={24}>  
            <Col span={24}>
                <Form.Item  label="書箱探討主題" >
                {(readingBoxItem.box_topic||"").replaceAll("^Z^", " , ")} 
                </Form.Item>   
            </Col> 
        </Row>
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item    label="適讀年級">
                    {gradeMap.size > 0 && (gradeMap.get(parseInt(readingBoxItem.box_grade))|| "")} 
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item  label="適讀科目"> 
                    {subjectMap.size > 0 && (subjectMap.get(parseInt(readingBoxItem.box_subject))|| "")} 
                </Form.Item>  
            </Col>  
        </Row>  
       
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item  label="是否顯示於前台"> 
                   {parseInt(readingBoxItem.isshow) === 1 ? "是" : "否"}
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item label="書箱性質"> 
                  {kindMap.size > 0 && (kindMap.get(parseInt(readingBoxItem.box_kind))||"")} 
                </Form.Item>  
            </Col>  
        </Row>
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item label="加入用途書"> 
                    {parseInt(readingBoxItem.addpropose) === 1 ? "是" : "否"} 
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item label="借閱天數"> 
                   {readingBoxItem.borrow_days}   
                </Form.Item>  
            </Col>  
        </Row>
        {readingBoxItem.box_status === 1  && (<>
        <Divider />
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item label="讀者證號"> 
                    {readingBoxItem.readerCode} 
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item label="讀者姓名"> 
                   {readingBoxItem.readerName}   
                </Form.Item>  
            </Col>  
        </Row> 
        <Row gutter={24}>   
            <Col span={8}>
                <Form.Item label="申請時間">  
                    {moment(readingBoxItem.orderDate).format("YYYY-MM-DD HH:mm")} 
                </Form.Item>  
            </Col>
            <Col span={8}>
                <Form.Item label="借閱時間"> 
                    {moment(readingBoxItem.lendDate).format("YYYY-MM-DD HH:mm")} 
                </Form.Item>  
            </Col>  
            <Col span={8}>
                <Form.Item label="應還日期"> 
                    {moment(readingBoxItem.returnDate).format("YYYY-MM-DD HH:mm")}  
                </Form.Item>  
            </Col>  
        </Row></>)}
        <Divider />
        <ProTable<ReadingBoxConfigItem>
        columns={columns}
        actionRef={actionRef}
        search={false}  
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
    </Modal></>
    );
};

export default ReadingBoxShow;
