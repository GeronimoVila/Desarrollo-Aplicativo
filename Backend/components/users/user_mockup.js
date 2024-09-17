import { Dependency } from "../../libs/dependency.js";
export class UserMockup{
    static list = [
        {
            uuid: 'ff39511d-a77c-49df-9364-1f396c807285',
            username: 'Admin',
            displayName: 'Administrator',   
            hashedPassword: "$2b$10$FUfxuVGvTIGjCTC0VvW0C.o066yUxalHaDLWVMtHgSJn8bDEow6/y"
        },
        {
            uuid: 'b4f64d24-610d-46d5-92e0-ff753cfe12fc',
            username: 'Pedro',
            displayName: 'Pedro pe',
            hashedPassword: "$2b$10$FUfxuVGvTIGjCTC0VvW0C.o066yUxalHaDLWVMtHgSJn8bDEow6/y",
        },
    ];
 

    async getList(filters,options){
        const result =[];
        if(filters){
        for(const item of UserMockup.list){
            let includeItem = true;
            for(const filterName in filters){
                const filterValue = filters[filterName];         
                if(item[filterName] != filterValue){
                    includeItem = false;
                    break;
                }
            }

            if (includeItem){
                result.push(item);
            }
        }

    }else{
        result.push(...UserMockup.list);
    }
    

        if (options?.skip){
            result.splice(0, options.skip);
        }

        if (options?.limit){
            result.splice(options.limit, result.length);
        }

        return result
    }


    create(data){
        UserMockup.list.push(data);
    }
}