# Student

## Endpoints

### (POST) /student/create
```
    {
      "name": "Tevez",
      "registration": 116
    }
```

### (GET) /student/searchAll

### (GET) /student/search?registration=100
- Query param: **registration**

### (PUT) /student/update?registration=100
- Query param: **registration**

### (PATCH) /student/update?registration=100
- Query param: **registration**

### (DELETE) /student/delete?registration=116
- Query param: **registration**

### (POST) /student/create
- Insertion of student with course
```
    {
      "name": "Tevez",
      "registration": 116,
      "courses": ["5e9f1fea-0a65-4509-b394-2d57ff78cf30"]
    }
```  

# Course

## Endpoints

### (POST) /course/create
```
    {
      "name": "Contabilidade",
      "description": "Curso de contabilidade"
    }
```

### (GET) /course/searchAll

### (GET) /course/search?name=Contabilidade
- Query param: **name**

### (PUT) /course/update?name=Contabilidade
- Query param: **name**

### (PATCH) /course/update?name=Contabilidade
- Query param: **name**

### (DELETE) /course/delete?name=Contabilidade
- Query param: **name**

### (POST) /course/create
- Insertion of course with student
```
    {
      "name": "Sistemas da Informação",
      "description": "Curso de SI",
      "students": ["b30eb1b8-3df6-4aa7-944f-7fdba6526c87"]
    }
```