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

class Tab extends Component<ListSearchProps> {
  handleTabChange = (key: string) => { 
    const { match } = this.props;
    const url = match.url === '/' ? '' : match.url;

 
    switch (key) {
      case 'list':
        history.push(`${url}/list`);
        break;
      case 'setting':
        history.push(`${url}/setting`);
        break;
      case 'policy':
          history.push(`${url}/policy`);
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
        key: 'list',
        tab: '書箱列表',
      },
      {
        key: 'setting',
        tab: '書箱設定',
      } ,
      {
        key: 'policy',
        tab: '書箱政策',
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

export default Tab;
