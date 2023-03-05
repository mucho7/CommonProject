import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function NavbarSearch() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search For More"
        inputProps={{ 'aria-label': 'search for more' }}
      />
      <IconButton type="button" sx={{ p: '10px', color: '#FCA311' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
}