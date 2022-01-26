import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { history } from '../../../helpers'

export const MainListItems = () => (
  <div>
    <ListItem button >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText
        // onClick={()=>{history.push('/dashboard')}} 
        primary="Dashboard" />
    </ListItem>
  </div>
);

export const SecondaryListItems = ({ student }) => {
  return (
    <div>
      <ListSubheader inset>TERMINAL REPORTS</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          // onClick={()=>{history.push(`/g-child-report/${student.id}/${student.session.id}/1`)}} 
          primary="First term" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Second term" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Third term" />
      </ListItem>
      <ListSubheader inset>TRANSCRIPTS</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          // onClick={()=>{history.push(`/g-child/${student.id}`)}} 
          primary="Current Session" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText onClick={() => { history.push(`/g-child-ses-reports/${student.id}/${student.session.id}`) }} primary="Previous Sessions" />
      </ListItem>
    </div>
  );
}

export const AdminNav = () => {
  return (
    <div>
      <ListSubheader inset>Admin Dashboard</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          onClick={() => { history.push(`/dashboard/teachers`) }}
          primary="Teachers" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Second term" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Third term" />
      </ListItem>
      <ListSubheader inset>Transcripts</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          // onClick={()=>{history.push(`/g-child/${student.id}`)}} 
          primary="Current Session" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          // onClick={()=>{history.push(`/g-child-ses-reports/${student.id}/${student.session.id}`)}} 
          primary="Previous Sessions" />
      </ListItem>
    </div>
  );
}
export const TeacherNav = () => {
  return (
    <div>
      <ListSubheader inset>Teacher Dashboard</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
        onClick={() => { history.push(`/dashboard/teacher/profile`) }} 
        primary="Profile" />
      </ListItem>
      
        <ListSubheader inset>Academic duty</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => { history.push(`/dashboard/students`) }}
            primary="Class register" />
        </ListItem>
        
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Terminal records" />
      </ListItem>

      <ListSubheader inset>Report sheets</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          // onClick={()=>{history.push(`/g-child/${student.id}`)}} 
          primary="Current Session" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          // onClick={()=>{history.push(`/g-child-ses-reports/${student.id}/${student.session.id}`)}} 
          primary="Previous Sessions" />
      </ListItem>
    </div>
  );
}