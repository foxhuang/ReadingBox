import React, { useEffect, useState } from "react";
import { Divider,Modal, Form,Row,Col } from "antd";
import { getReadingBoxConfigByType  } from "../../pages/service";
import '../../pages/css/customButtonStyles.css';  
import moment from "moment";
  
const ReadingBoxOrderShow: React.FC<{}> = (props: any) => {
    const { showModalVisible, onCancel,readingBoxItems,rboId} = props;  
    const [readingBoxItem, setReadingBoxItems] = useState({}); 
    
    console.log("rboId",rboId);

    useEffect(() => {  
        const fetchData = async () => {   
            console.log("readingBoxItems==>",readingBoxItems);
            if(readingBoxItems.length > 0){
                readingBoxItems.map((item) => {
                    console.log("item===>",item);
                    if(item.rbo.id === rboId){
                        console.log("item",item);
                        setReadingBoxItems(item);
                    }
                });  
            }
        };
        fetchData();
    },[rboId]); 
    return (
        <> 
        <Modal destroyOnClose title={"書箱資訊"} visible={showModalVisible} onCancel={() => onCancel()} width={1000} footer={null}>
         
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item    label="書箱條碼">  
                {readingBoxItem.boxNo}   
                </Form.Item>  
            </Col>
            <Col span={12}>
                <Form.Item  label="書箱名稱">
                   {readingBoxItem.boxTitle}    
                </Form.Item>  
            </Col> 
        </Row>
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item   label="書箱館藏地">
                 {readingBoxItem.boxKeepsiteName|| ""} 
                </Form.Item>  
            </Col>  
            <Col span={12}>
                <Form.Item   label="冊數">
                 {readingBoxItem.bookCnt|| ""} 
                </Form.Item>  
            </Col>  
        </Row>
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item   label="讀者姓名">
                {(readingBoxItem.readerName || "")} 
                </Form.Item>  
            </Col>  
            <Col span={12}>
                <Form.Item   label="申請時間">
                {readingBoxItem.rbo !== undefined && (moment(readingBoxItem.rbo.order_date).format("YYYY-MM-DD HH:mm")
                 || "")} 
                </Form.Item>  
            </Col>  
        </Row>
        <Row gutter={24}>   
            <Col span={12}>
                <Form.Item   label="書箱狀態">
                {parseInt(readingBoxItem.orderStatus) === 1 ? "外借中" : "在館內" } 
                </Form.Item>  
            </Col>  
            <Col span={12}>
                <Form.Item   label="申請狀態">
                {readingBoxItem.rbo !== undefined && parseInt(readingBoxItem.rbo.status) === 1 ? "外借中" : "在館內" } 
                </Form.Item>  
            </Col>  
        </Row>
        <Divider />
    </Modal></>
    );
};

export default ReadingBoxOrderShow;
