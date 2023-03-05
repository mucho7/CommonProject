import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';


function IdeSettingBar(props) {
  const [userLanguage, setUserLanguage] = useState("java");


  return (
    <Box sx={{ minWidth: 120, height: 60, bgcolor: "white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userLanguage}
          label="userLanguage"
          onChange={setUserLanguage}
        >
          <MenuItem value={"java"}>JAVA</MenuItem>
          <MenuItem value={"python"}>PYTHON</MenuItem>
          <MenuItem value={"javascript"}>JAVASCRIPT</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default IdeSettingBar;