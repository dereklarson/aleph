import React from 'react';
import HttpsIcon from '@material-ui/icons/Https';
import HelpIcon from '@material-ui/icons/Help';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GrainIcon from '@material-ui/icons/Grain';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BuildIcon from '@material-ui/icons/Build';
import RefreshIcon from '@material-ui/icons/Refresh';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReceiptIcon from '@material-ui/icons/Receipt';

export const iconSource = {
  def: <HelpIcon />,
  // Interface
  god_mode: <HttpsIcon />,
  play_tutorial: <HelpIcon />,
  load_checkpoint: <CloudDownloadIcon />,
  save_checkpoint: <CloudUploadIcon />,
  // Saved items
  assignment: <AssignmentIcon />,
  // Locations
  docker: <DashboardIcon />,
  pipeline: <GrainIcon />,
  data: <AccountBalanceIcon />,
  configuration: <ReceiptIcon />,
  // Actions
  clear_diagram: <DeleteOutlineIcon />,
  build_marked: <BuildIcon />,
  cancel_build: <CancelIcon />,
  refresh: <RefreshIcon />,
  show_logs: <ReceiptIcon />,
  save_diagram: <LibraryBooksIcon />,
}
