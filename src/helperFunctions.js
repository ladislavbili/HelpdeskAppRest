export const formatDate = (time) => {
  let date = new Date(time);
  if(isNaN(date.getTime())){
    return '';
  }
  return date.getHours() + ":" + ((date.getMinutes()<10)? "0" + date.getMinutes() : date.getMinutes()) + " " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
};

export const processInteger = (input)=>{
  if(input==''){
    return '0'
  }
  if(!/^\d*$/.test(input)){
    return false;
  }
  if(input.length!=1 && input[0]=='0'){
    return input.substring(1);
  }
  else{
    return input;
  }
}
