import CardMedia from '@mui/material/CardMedia';

export default function DisplayCardMedia({p}){
    if(p.media_src === null){
      return(
        <></>
      )
    }
    
    if(p.media_type.includes('video')){
      return(
        <CardMedia
          component={'video'}
          width="100%"
          controls={true}
          height="auto"
          src={p.media_src}
          alt="Paella dish"
        />
      )
    }else if(p.media_type.includes('audio')){
      return(
        <div style={{display:'flex', gap: '15px'}}>
          <div></div>
          <audio controls style={{width: '100%'}}>
            <source src={p.media_src} type={p.media_type} />
          </audio>
          <div></div>
        </div>
      )
    }else if(p.media_type.includes('image')){
      return(
        <CardMedia
          component={'img'}
          width="100%"
          height="auto"
          src={p.media_src}
          alt="Paella dish"
        />
      )
    }else{
  
      const googleDocsViewerUrl = `https://docs.google.com/gview?url=${p.media_src}&embedded=true`;
  
      return (
        <iframe
          src={googleDocsViewerUrl}
          style={{ border: 'none', width: '100%', minHeight: '350px' }}
          title="PDF Viewer"
        />
      );
    }
  }