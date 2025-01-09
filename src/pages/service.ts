import request from 'umi-request';  

export async function getSDGs() { 
    try {
        const response = await request('../../hysdgs/getSDGs', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function sendReadingBox(values?: any) { 
    try {
        const response = await request('../../hyreadingbox/sendReadingBox', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function getAllReadingBoxOrder() { 
    try {
        const response = await request('../../hyreadingbox/getReadingBoxOrder?pageSize=10000', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function getReadingBoxOrder(readerId?: number,readerCode?: string) { 
    try {
        const response = await request('../../hyreadingbox/getReadingBoxOrder?readerId='+readerId+'&readerCode='+readerCode, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function sendReadingBoxOrderAndReNewCnt(values?: any) { 

    try {
        const response = await request('../../hyreadingbox/sendReadingBoxOrderAndReNewCnt', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;

}

export async function addReadingBoxBookByBarcode(rbId?: number,sbarcode?: string,ebarcode?: string) { 
    try {
        const response = await request('../../hyreadingbox/addReadingBoxBookByBarcode?rbId='+rbId+'&sbarcode='+sbarcode+'&ebarcode='+ebarcode, {
            method: 'POST',   
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;

}
export async function deleteReadingBoxBook(rbbId?: number ) { 
    try {
        const response = await request('../../hyreadingbox/deleteReadingBoxBook?rbbId='+rbbId, {
            method: 'POST',   
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;

}

export async function deleteReadingBoxOrder(rboId?: number,rboNo?: string) { 
    try {
        const response = await request('../../hyreadingbox/returnReadingBoxBook?rboId='+rboId+'&rboNo='+rboNo, {
            method: 'POST',   
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;

}


export async function borrowReadingBoxBook(readerId?: number ,rboId?: number ) { 
    try {
        const response = await request('../../hyreadingbox/borrowReadingBoxBook?readerId='+readerId+'&rboId='+rboId, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;

}

export async function getReadingBoxOrderAndReNewCnt() { 
    try {
        const response = await request('../../hyreadingbox/getReadingBoxOrderAndReNewCnt', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;

}

export async function sendReadingBoxConfig(values?: any) { 
    try {
        const response = await request('../../hyreadingbox/sendReadingBoxConfig', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}



export async function deleteReadingBoxConfig(id: number) { 
    try {
        const response = await request('../../hyreadingbox/deleteReadingBoxConfig?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function deleteReadingBox(id: number) { 
    try {
        const response = await request('../../hyreadingbox/deleteReadingBox?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function getReadingBox(id: number) { 
    try {
        const response = await request('../../hyreadingbox/getReadingBox?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function getReadingBoxConfigByType(type?: string) { 
    try {
        const response = await request('../../hyreadingbox/getReadingBoxConfigByType?type='+type, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function getReadingBoxConfigByTypeAndId(type?: string,id?: number) { 
    try {
        const response = await request('../../hyreadingbox/getReadingBoxConfigByType?type='+type+'&id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
export async function getSDGsBooksById(id?: number) { 
    try {
        const response = await request('../../hysdgs/getSDGsBooksById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

 
export async function getChatGPT(sdgsId?: number,marcId?: number,useAI?: number) { 
    try { 
        const response = await request('../../hysdgs/getChatGPT?sdgsId='+sdgsId+'&marcId='+marcId+'&useAI='+useAI, {
            method: 'GET', 
        }); 
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function getSDGsItemById(id?: number) { 
    try {
        const response = await request('../../hysdgs/getSDGsItemById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function delSDGsItem(id?: number) { 
    try {
        const response = await request('../../hysdgs/delSDGsItem?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}



export async function addSDGsItem(values?: any) { 
    try {
        const response = await request('../../hysdgs/addSDGsItem', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function addSDGsBooks(values?: any) { 
    try {
        const response = await request('../../hysdgs/addSDGsBooks', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function addSDGsKeyword(values?: any) { 
    try {
        const response = await request('../../hysdgs/addSDGsKeyword', {
            method: 'POST', 
            data: values,  
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function delSDGsBooksById(id?: number) { 
    try {
        const response = await request('../../hysdgs/delSDGsBooksById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function delSDGsKeyword(id?: number) { 
    try {
        const response = await request('../../hysdgs/delSDGsKeywordById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function getBagM() {
    try {
        const response = await request('../../hysdgs/getBagM', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
} 

export async function getSDGsKeywordById(id?: number) { 
    try {
        const response = await request('../../hysdgs/getSDGsKeywordById?id='+id, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}

export async function addSDGsBooksByBagM(bagmId?: number,sdgsId?: number,formSave?: number,formShow?: number) { 
    try {
        const response = await request('../../hysdgs/addSDGsBooksByBagM?bagmId='+bagmId+"&sdgsId="+sdgsId+"&formSave="+formSave+"&formShow="+formShow, {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}


export async function getKeepsite() { 
    try {
        const response = await request('../../hyreadingbox/getKeepsite', {
            method: 'GET', 
        }); 
        console.log(response);
        return response;
    } catch (error) { 
        console.error(error);
    }
    return null;
}
