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
import PlaceIcon from '@material-ui/icons/Place';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import TableChartIcon from '@material-ui/icons/TableChart';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import Crop32Icon from '@material-ui/icons/Crop32';
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
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// Ticker
import SubjectIcon from '@material-ui/icons/Subject';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
// Vertices
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import CallMergeIcon from '@material-ui/icons/CallMerge';

export const iconSource = {
  def: <HelpIcon />,
  // AppBar
  god_mode: <HttpsIcon />,
  play_tutorial: <MenuBookIcon />,
  set_theme: <NightsStayIcon />,
  load_checkpoint: <CloudDownloadIcon />,
  save_checkpoint: <CloudUploadIcon />,
  // Sidebar - locations
  locations: <PlaceIcon />,
  configuration: <AccountBalanceIcon />,
  data: <TableChartIcon />,
  docker: <Crop32Icon />,
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
  test_mode: <ToggleOffIcon />,
  run_pipeline: <DirectionsRunIcon />,
  // Saved items
  saved_item: <FolderIcon />,
  // Ticker
  show_logs: <SubjectIcon />,
  clear_diagram: <DeleteOutlineIcon />,
  // Vertices
  node: <DonutSmallIcon style={{padding: 3}} />,
  dockernode: <CallMergeIcon />,
  basenode: <Crop32Icon />,
};
