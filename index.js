let express = require('express');
let app = express();
let bodyParser=require('body-parser');
let Twitter=require('twitter');
app.use(express.static('web_page'));
let server=app.listen(8080,()=>console.log('listening...'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get('/name',(req,res)=>{

    let min_id=null;
    let search_term=req.query['search_term'];
    let full_data=[];

    let tweets=get_tweets(search_term,min_id)
                                .then((tweets_,p2,p3)=>{
                                let parsed=findText(tweets_);
                                // full_data.push(({parsed:parsed,raw:tweets_}));
                                full_data.push(parsed['strs']);
                                min_id=parsed['smalest'];
                                return this;
                                //
                                }).then(()=>get_tweets(search_term,min_id)
                                .then((tweets_i,p2,p3)=>{
                                    let parsed=findText(tweets_i);
                                    // full_data.push(({parsed:parsed,raw:tweets_i}));
                                    full_data.push(parsed['strs']);
                                    min_id=parsed['smalest'];
                                    return this;
                                    }))
                                    .then(()=>get_tweets(search_term,min_id)
                                    .then((tweets_i,p2,p3)=>{
                                        let parsed=findText(tweets_i);
                                        // full_data.push(({parsed:parsed,raw:tweets_i}));
                                        full_data.push(parsed['strs']);
                                        min_id=parsed['smalest'];
                                        return this;
                                        }))
                                        .then(()=>get_tweets(search_term,min_id)
                                        .then((tweets_i,p2,p3)=>{
                                            let parsed=findText(tweets_i);
                                            // full_data.push(({parsed:parsed,raw:tweets_i}));
                                            full_data.push(parsed['strs']);
                                            min_id=parsed['smalest'];
                                            return this;
                                            }))
                                            .then(()=>get_tweets(search_term,min_id)
                                            .then((tweets_i,p2,p3)=>{
                                                let parsed=findText(tweets_i);
                                                // full_data.push(({parsed:parsed,raw:tweets_i}));
                                                full_data.push(parsed['strs']);
                                                min_id=parsed['smalest'];
                                                return this;
                                                }))
                                                    .then(()=>get_tweets(search_term,min_id)
                                                    .then((tweets_i,p2,p3)=>{
                                                        let parsed=findText(tweets_i);
                                                        // full_data.push(({parsed:parsed,raw:tweets_i}));
                                                        full_data.push(parsed['strs']);
                                                        min_id=parsed['smalest'];
                                                        return this;
                                                        }))
                                                        .then(()=>get_tweets(search_term,min_id)
                                                        .then((tweets_i,p2,p3)=>{
                                                            let parsed=findText(tweets_i);
                                                            // full_data.push(({parsed:parsed,raw:tweets_i}));
                                                            full_data.push(parsed['strs']);
                                                            min_id=parsed['smalest'];
                                                            return this;
                                                            }))
                                                            .then(()=>get_tweets(search_term,min_id)
                                                            .then((tweets_i,p2,p3)=>{
                                                                let parsed=findText(tweets_i);
                                                                // full_data.push(({parsed:parsed,raw:tweets_i}));
                                                                full_data.push(parsed['strs']);
                                                                min_id=parsed['smalest'];
                                                                return this;}))
                                                                .then(()=>get_tweets(search_term,min_id)
                                                                .then((tweets_i,p2,p3)=>{
                                                                    let parsed=findText(tweets_i);
                                                                    // full_data.push(({parsed:parsed,raw:tweets_i}));
                                                                    full_data.push(parsed['strs']);
                                                                    min_id=parsed['smalest'];
                                                                    return this;}))
                                                                    .then(()=>get_tweets(search_term,min_id)
                                                                    .then((tweets_i,p2,p3)=>{
                                                                        let parsed=findText(tweets_i);
                                                                        // full_data.push(({parsed:parsed,raw:tweets_i}));
                                                                        full_data.push(parsed['strs']);
                                                                        min_id=parsed['smalest'];
                                                                        res.send(full_data)
                                                                        return this;
                                                                        })).catch(e=>{console.log(e)});

    
});

function get_tweets(search_term,smalest=null){
    let tweets_g;null
    let auth_data={
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      };
    //   console.log(auth_data);
    //   console.log(search_term);
    let client = new Twitter(auth_data);
    if (smalest==null){
        return client.get('search/tweets',{q:search_term,count:100});
        }
    else{
        return client.get('search/tweets',{q:search_term,count:100,max_id:smalest});
    }
}

function findText(tweets){
    let str_arr=[];
    let max_id=tweets['search_metadata']['max_id'];
    let ids=[];
    for(let i=0; i<tweets['statuses'].length; i++){
            str_arr.push(tweets['statuses'][i]["text"]);
            ids.push(tweets['statuses'][i]['id']);
    }
    return {strs:str_arr,max_id:max_id,ids:ids,smalest:find_smallest(ids)};
}

function find_smallest(ids){
    let smalest=ids[0];
    for (let elem in ids){
        if (ids[elem] <smalest){
            smalest=ids[elem];
        }
    }
    return smalest;
}