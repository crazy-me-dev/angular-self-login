import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LinkService {
    constructor(private http: HttpClient){}
    url = 'http://localhost:8080';
    // private createHeader(contentType: string = null): Headers {
    //     const headers = new Headers();
    //     headers.append('Content-Type', contentType == null ? 'application/json' : contentType);
    //     return headers; //application/json; charset=utf-8
    // }
    getUsers() {
        return this.http.get(`${this.url}/api/users`);
    }
    checkuser(user: any = null) {
        return this.http.post(`${this.url}/api/checkuser`,user);
    }
    saveuser(user: any = null) {
       console.log(user)
        return this.http.post(`${this.url}/api/user`,user);
    }
    googleuser(user: any = null) {
        console.log(user)
        return this.http.post(`${this.url}/api/auth/google`,{access_token:user.token});
    }
    deleteuser(user_id: any = null) {
       
        return this.http.delete(`${this.url}/api/delete?user_id=${user_id}`);
    }
    imageupload(uploadData: any = null) {
        console.log(uploadData)
        // let headers = new HttpHeaders();
        // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        // return this.http.post(`${this.url}/api/image`, uploadData, {headers: headers});
        return this.http.post(`${this.url}/api/image`, uploadData);
    }
    adddata(adddata: any = null) {
        console.log(adddata)
         return this.http.post(`${this.url}/api/jogging`,adddata);
     }
    getData() {
        return this.http.get(`${this.url}/api/getdata`);
    }
    updatedata(user_id: any = null, updatedata: any = null) {
        console.log(user_id);
        
        return this.http.put(`${this.url}/api/updatedata/${user_id}`,{data:JSON.stringify(updatedata)});
    }
    deletedata(user_id: any = null) {
        return this.http.delete(`${this.url}/api/deletedata/${user_id}`);
    }

    editdata(user_id: any = null) {
        console.log("+++++++++++++")
        console.log(user_id)
        return this.http.get(`${this.url}/api/editdata/${user_id}`);
    }
    

}
