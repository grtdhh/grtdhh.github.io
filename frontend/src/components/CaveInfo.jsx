import React from 'react';
import { Card, Descriptions } from 'antd';

const CaveInfo = ({ caveData }) => {
  return (
    <Card title="洞窟信息" style={{ marginTop: '20px' }}>
      <Descriptions bordered>
        <Descriptions.Item label="洞窟编号">
          {caveData?.number || '待选择'}
        </Descriptions.Item>
        <Descriptions.Item label="建造年代">
          {caveData?.dynasty || '待选择'}
        </Descriptions.Item>
        <Descriptions.Item label="主要内容">
          {caveData?.content || '待选择'}
        </Descriptions.Item>
        <Descriptions.Item label="艺术特色">
          {caveData?.features || '待选择'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CaveInfo; 