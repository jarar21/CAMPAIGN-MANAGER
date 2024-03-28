// CampaignModal.js

import React from "react";
import styles from "@/src/styles/CampaignModal.module.css";

const CampaignModal = ({ campaign, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <div className={styles.modalBody}>
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <p>Created at: {campaign.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignModal;