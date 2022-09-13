import * as React from 'react';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import TextField from "@mui/material/TextField";
import ToggleButton from '@mui/material/ToggleButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import '../css/home.css'
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import moment from 'moment';

const StartPage = () => {
  const [value_, setValue] = useState(0);
  const [jsonList,setJsonList]=useState({})
  const [inputText, setInputText] = useState("");
  const [jsonListNew,setJsonListNew]=useState({})
  const [sortList,SetSortList]=useState("desc");
  const [sortAscList,SetSortAscList]=useState({});
  const [view, setView] = useState('list');
  const [typeMedia, setTypeMedia] = useState(undefined);
  const types=sortAscList && sortAscList.length && sortAscList.map((item) =>item.Type)
  .filter((types, index, array) => array.indexOf(types) === index)
  const counts=types && types.length && types.map((types) => ({
    type: types,
    count: sortAscList.filter(item => item.Type === types).length
  }))

  // 1. Make an api call to the response.json file
  const fetchData = () => {
    fetch('https://raw.githubusercontent.com/chanizilberberg5/jsonFile/main/angular_react_Response.json')
    .then((res) =>res.json())
    .then((response) => {
      console.log(response.results);
      const sortList=[...response.results].sort((a,b)=>{
            return a.Title>b.Title?1:-1
         })
         setJsonList(sortList);
         console.log(sortList.length)
         SetSortAscList(sortList)
            setJsonListNew(sortList)
        })
        // 2. Handle api call error if call fails
        .catch(err => {
          console.log(err);
    });
  }
  useEffect( function () {
    fetchData()
  },[]);

  function showCards () {
    return(<>
            { jsonList && jsonList.length && jsonList.map((item, index) =>{return(
              <Grid item xs={6} >
                {(typeMedia===undefined||typeMedia === item.Type) && <Card sx={{ display: 'flex', margin:6,width:450}}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150,height:200}}
                    image={item.Poster}
                    alt="Live from space album cover"/>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto',width:280,marginTop:5 }}>
                      <Typography component="div" variant="h5">{item.Title}</Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                      {/* Show formatted year */}
                        {moment(item.Year, "YYYYMMDD").calendar()}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>}
              </Grid>)}
        )}
    </>)
  }


    const handleChange = (event, nextView) => {
      setView(nextView);
    };

    function refresh_(){
      window.location.reload(false)
        // clear()
        // setTypeMedia(undefined)
        // // fetchData()
    };
     

    function sortByNameAsc(){
          const sortList=[...jsonList].sort((a,b)=>{
            return a.Title>b.Title?1:-1
         })
         setJsonList(sortList)
         setJsonListNew(sortList)
         SetSortList("desc")
    }

    function sortByNameDesc(){
        const sortList=[...jsonList].sort((a,b)=>{
            return a.Title>b.Title?-1:1
         })
         setJsonList(sortList)
         SetSortList("asc")
    }

    function sort_(){
        if(sortList==="asc")
            sortByNameAsc()
        else
            sortByNameDesc()
    }


  function clear(){
    setJsonList(jsonListNew)
    setInputText("");
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    const newList=jsonListNew.filter(x=>x.Title.toLowerCase().includes(lowerCase)|| x.Year.includes(lowerCase))
    setJsonList(newList)
  };
 

  const handleChange2 = (event, newValue) => {
    setTypeMedia(undefined)
    setValue(newValue);
    console.log(newValue)
    console.log(counts)
    console.log(counts[newValue-1].type)
    setTypeMedia(counts[newValue-1].type)
  };

return (<> 
    {/* 3. Show all json response, split them by the type and count them */}
    {/* 4. Create tabs, by name and item count, each click will display the relevant items */}
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value_} onChange={handleChange2} aria-label="basic lable tabs example">
          <Tab label={"all"}/>
           {counts && counts.length &&counts.map(r => (
        <Tab  label={r.type+'('+r.count+')' }  />
      ))}
        </Tabs>
      </Box>
    </Box>
  <div>
   </div>

   {/* 5. Create a toggle button, switching the view from list to grid */}
    <div className='buttons-group'>
        <ToggleButtonGroup
            value={view}
            className="changeView  button"
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="list"  aria-label="list">View List</ToggleButton>
            <ToggleButton value="grid" aria-label="grid">View Grid</ToggleButton>
        </ToggleButtonGroup>
        {/* 6. Create a search field, when typing a value, display only the items that contain the value in the name or year */}
        <div className="search button">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              value={inputText}
              label="Search"
              onChange={inputHandler}/>
        </div>
        {/* 7. Create a “clear” button - clears the search */}
        <Button className="button clear"  variant="outlined" onClick={clear}>clear</Button>
        {/* 8. Create a refresh button that refresh the data again from the server */}
        <Button className="button refresh" variant="outlined"onClick={refresh_}>refresh</Button>
        {/* 9. Default sorting to the list is by name asc, create a sort button that switch between asc/desc */}
        <Button className="button sort" variant="outlined" onClick={sort_}>sort {sortList}</Button>
    </div>      
            
    {/* viewGrid */}
    {jsonList.length!==0 &&view==="grid"&& <div className='contents'>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >   
          {showCards()}
      </Grid>
    </div>}

    {/* viewList */}
    { jsonList.length!==0 &&view==="list"&& <div className='cardList'>{showCards()}</div>}

    {/* if there are no items matching the search */}
    {jsonList.length===0 &&(<h1>No data matching your search</h1>)}
  </>
    )
};

export default StartPage;

