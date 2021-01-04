import React from 'react';
import { Tabs as TabsAntd } from 'antd';
import { DetailsTab } from './Details';
import { CommentsTab } from './Comments';
import { Worklogs } from './Worklogs';
import { IProps } from './types';

export const Tabs: React.FC<IProps> = (props) => {
  return (
    <TabsAntd className={props.className} defaultActiveKey='Details'>
      <TabsAntd.TabPane tab='Details' key='Details'>
        <DetailsTab priority={props.issue.priority} description={props.issue.description} />
      </TabsAntd.TabPane>
      <TabsAntd.TabPane tab={`Comments (${props.comments.length})`} key='Comments'>
        <CommentsTab
          employee={props.employee}
          comments={props.comments}
          addComment={props.addComment}
          editComment={props.editComment}
          deleteComment={props.deleteComment}
        />
      </TabsAntd.TabPane>
      <TabsAntd.TabPane tab={`Worklogs (${props.worklogs.length})`} key='Worklogs'>
        <Worklogs
          employee={props.employee}
          worklogs={props.worklogs}
          deleteWorkLog={props.deleteWorkLog}
          originalEstimate={props.issue.originalEstimate}
        />
      </TabsAntd.TabPane>
    </TabsAntd>
  );
};
