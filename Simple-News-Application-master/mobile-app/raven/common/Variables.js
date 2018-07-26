import { 
  Dimensions
} from 'react-native';

export default class Variables {
    static APIUrl = 'https://news-backend-vn.herokuapp.com/public/';
    static width = Dimensions.get('window').width;
    static height = Dimensions.get('window').height;
    static email = 'trinh.nck@gmail.com';
}
