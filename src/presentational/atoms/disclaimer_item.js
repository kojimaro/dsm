import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const DisclaimerItem = () => {
    const sentence01 = "こちらのD.S.Mはベータ版です。誰でも簡単に分散ストレージのIPFSへWebサイトをアップロードして公開することができます。Ropstenテストネットワークを指定することでご利用いただけます。";

    const sentence02 = "アップロードしたファイルは削除することができません。違法なファイルのアップロードはご遠慮ください。4MB以上のファイルはアップロードに失敗する可能性があります。"

    const sentence03 = "当アプリケーション（D.S.M）の御利用につき、何らかのトラブルや損失・損害等につきましては一切開発者は責任を問わないものとします。";

    return(
        <React.Fragment>
          <ListItem>
            <ListItemText primary="D.S.M(β) ver 1.0.0" secondary={sentence01}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="ご利用上の注意" secondary={sentence02}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="免責事項" secondary={sentence03}/>
          </ListItem>
        </React.Fragment>
    );
}

export default DisclaimerItem;