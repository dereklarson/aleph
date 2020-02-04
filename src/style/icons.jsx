// @format
import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
// AppBar
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import HttpsIcon from '@material-ui/icons/Https';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// Sidebar - locations
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GrainIcon from '@material-ui/icons/Grain';
// Sidebar - bulkActions
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import RefreshIcon from '@material-ui/icons/Refresh';
import BusinessIcon from '@material-ui/icons/Business';
import CancelIcon from '@material-ui/icons/Cancel';
import BuildIcon from '@material-ui/icons/Build';
import GetAppIcon from '@material-ui/icons/GetApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import FolderIcon from '@material-ui/icons/Folder';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// Ticker
import SubjectIcon from '@material-ui/icons/Subject';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

export const iconSource = {
  def: <HelpIcon />,
  // AppBar
  god_mode: <HttpsIcon />,
  play_tutorial: <MenuBookIcon />,
  set_theme: <NightsStayIcon />,
  load_checkpoint: <CloudDownloadIcon />,
  save_checkpoint: <CloudUploadIcon />,
  // Sidebar - locations
  configuration: <ReceiptIcon />,
  data: <AccountBalanceIcon />,
  docker: <DashboardIcon />,
  pipeline: <GrainIcon />,
  // Actions
  save_diagram: <LibraryBooksIcon />,
  refresh: <RefreshIcon />,
  set_org: <BusinessIcon />,
  load_org: <GetAppIcon />,
  push_org: <GitHubIcon />,
  build_marked: <BuildIcon />,
  cancel_build: <CancelIcon />,
  push_images: <CloudUploadIcon />,
  // Saved items
  saved_item: <FolderIcon />,
  // Ticker
  show_logs: <SubjectIcon />,
  clear_diagram: <DeleteOutlineIcon />,
  toggle_dagre: <SettingsOverscanIcon />,
};
