import { Component } from 'react'; 
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi'; 

interface ListSearchProps {
  match: {
    url: string,
    path: string,
  };
  location: {
    pathname: string,
  };
}

class OrderTab extends Component<ListSearchProps> {
  handleTabChange = (key: string) => { 
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;

 
    switch (key) {
      case 'orderlist':
        history.push(`${url}/orderlist`);
        break;
      case 'lend':
        history.push(`${url}/lend`);
        break;
      case 'lendsearch':
          history.push(`${url}/lendsearch`);
          break;
      default:
        break;
    }
  };

  handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path; 
    console.info('getTabKey url', url); 
    console.info('getTabKey  location.pathname',  location.pathname);
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      console.info('getTabKey tabKey', tabKey); 
      return tabKey;
    }
    return 'list';
  };

   
  
    
  render() {
    const tabList = [
      {
        key: 'orderlist',
        tab: '預約申請件',
      }, 
      {
        key: 'lendsearch',
        tab: '借書作業',
      } 
    ];
    const {children ,breadcrumb,title} = this.props; 


    return (
      <PageContainer
        header={{
          title: title, 
          breadcrumb:  breadcrumb ,
        }}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageContainer>
    );
  }
}

export default OrderTab;
