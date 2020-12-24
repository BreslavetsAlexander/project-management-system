import React from 'react';
import { Tabs as TabsAntd } from 'antd';
import { DetailsTab } from './Details';
import { CommentsTab } from './Comments';
import { HistoryTab } from './History';
import { IProps } from './types';

export const Tabs: React.FC<IProps> = (props) => {
  return (
    <TabsAntd className={props.className} defaultActiveKey='Details'>
      <TabsAntd.TabPane tab='Details' key='Details'>
        <DetailsTab priority={props.priority} description={props.description} />
      </TabsAntd.TabPane>
      <TabsAntd.TabPane tab={`Comments (${props.comments.length})`} key='Comments'>
        <CommentsTab
          comments={props.comments}
          addComment={props.addComment}
          editComment={props.editComment}
          deleteComment={props.deleteComment}
        />
      </TabsAntd.TabPane>
      <TabsAntd.TabPane tab='History' key='History'>
        <HistoryTab history={[1, 2, 3]} />
      </TabsAntd.TabPane>
    </TabsAntd>
  );
};
