import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi';
import { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import { VisitDataType } from '../data';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={
      <FormattedMessage
        id="dashboard.analysis.the-proportion-of-sales"
        defaultMessage="The Proportion of Sales"
      />
    }
    style={{
      height: '100%',
    }}
    extra={
      <div className={styles.salesCardExtra}>
        {dropdownGroup}
        <div className={styles.salesTypeRadio}>
          <Radio.Group value={salesType} onChange={handleChangeSalesType}>
            <Radio.Button value="all">
              <FormattedMessage id="dashboard.channel.all" defaultMessage="ALL" />
            </Radio.Button>
            <Radio.Button value="online">
              <FormattedMessage id="dashboard.channel.online" defaultMessage="Online" />
            </Radio.Button>
            <Radio.Button value="stores">
              <FormattedMessage id="dashboard.channel.stores" defaultMessage="Stores" />
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    }
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>
        <FormattedMessage id="dashboard.analysis.sales" defaultMessage="Sales" />
      </h4>
    </div>
  </Card>
);

export default ProportionSales;
