
import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export interface BaseForm {
  date: string[];
  
  current: number;
  pageSize: number;
  sorter: string;
}
export type ReadingBoxConfigItem = { 
  id: number;
  type: string;
  name: string;
  code: string;
  inUse: number;
  insert_muser_id: number;
  insert_date: string;
  update_muser_id: number;
  update_date: string;
  zh: string;
  en: string;
  jp: string;
  ch: string;
  
};
export type ReadingBoxItems = { 
  id: number;
  box_no: string;
  box_title: string;
  box_type: number;
  box_keepsiteid: number;
  box_imgId: number; 
  box_description: string; 
  box_grade: number; 
  box_subject: number;  
  box_topic: string; 
  box_kind: number; 
  box_status: string; 
  isshow: number; 
  addpropose: number; 
  borrow_days: number; 
  insert_muser_id: number; 
  insert_date: string; 
  update_muser_id: number; 
  update_date: string; 
  return_date: string; 
};



export type ReadingBoxOrderItems = { 
  id: number;
  boxNo: string;
  boxTitle: string; 
  boxKeepsiteId: number; 
  boxKeepsiteName: string; 
  readerId: number;
  readerName: string; 
  readerCode: string; 
  orderDate: string;   
  insertDate: string;   
  orderStatus: string; 
  renewCnt: number;  
  bookCnt: number;   
  returnDate: string;   
  returnNote: string;
};
export type ReadingBoxLendBookItems = { 
  id: number;
  title: string;
  barcode: string; 
  callNumber: string; 
  status: string; 
  datatype: string; 
  msg: string;   
};