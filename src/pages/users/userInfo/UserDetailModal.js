import { Button, Modal } from 'antd';
import React, { useState } from 'react';

const UserDetailModal = ({ onModal, setOnModal }) => {
  return (
    <>
      <Modal
        title='회원상세'
        centered
        visible={onModal}
        onOk={() => setOnModal(false)}
        onCancel={() => setOnModal(false)}
        width={'60%'}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default UserDetailModal;
