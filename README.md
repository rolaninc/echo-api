# Echo.api

## What is it?
Echo.api helps application developers (especially mobile apps developers) at their early stage of development.

it's simple but real world api, so it helps design and create app's data models, and...
  * test these models immediately
  * test ui components whether they expectedly interact with these models

the one of the most important goals of the api is that it is out of the box tool and developers DO NOT need to install any other tools than their usual tools such as Xcode, Android Studio or something.

just write requests on your favorite tools and send them using Echo.api 🚀

this project has been started as my very personal tool.
if it's useful to me, I believe, it would be helpful for someone else.  
***I NEVER LOG ANYTHING ABOUT YOUR REQUESTS.***  
so please feel free to try it 👉 [the playground](https://echo-api-sigma.vercel.app) .
and send me any feedbacks. I would love to hear what you think.

## How it works

POST request to [the api](https://echo-api-sigma.vercel.app/api/echo).  
then it will send your request's body back to you as a response.


### Structured Body
you can control your requests using structured body.

```json
{
  "statusCode": 200,
  "body": {
    "__meta__": {
      "users": {
        "l": {
          "count": 5
        }
      }
    },
    "users": {
      "id": "--id",
      "email": "--email@@name",
      "name": "--name",
      "thumb": "--image@@512",
      "profile": "--lorem@@:256",
      "created": "--unix@@-604800",
      "updated": "--iso@@-86400"
    }
  },
  "headers": {
    "x-echo": "echo/api"
  },
  "options": {
    "duration": 0
  }
}
```

#### Reserved Attributes (TOP LEVEL)
all attributes are optional.

| ATTR.      | NOTE                                                                                                                                             |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| body       | the api will just send only body's content back if you have one. otherwise it will response an entire content of the request's body back to you. |
| error      | alt content for when the status code is not in the 200s.                                                                                         |
| statusCode | http status code which will be set to your response.                                                                                             |
| headers    | T.B.D.                                                                                                                                           |
| options    | json object that contains some attributes for customizing the api. see the table below.                                                          |

##### Options
| ATTR.    | NOTE                                                                      |
|----------|---------------------------------------------------------------------------|
| duration | the api will wait for the specified time(msecs) to response your request. |

### Transformers
the built-in transformers help you build dummy data easily.

#### FAKERS
you can set [tag]@@[instructions] to value fields in your request body.   
then the api will convert them to appropriate dummy data in it's response.

all instructions are optional.

| TAG     | INSTRUCTIONS   | NOTE                                                                                                                               |
|---------|----------------|------------------------------------------------------------------------------------------------------------------------------------|
| --id    |                | generate unique string.                                                                                                            |
|         | ui             | unique string from current date and random value.  this option will be chosen if the instruction is unspecified.                   |
|         | cuid           | cuid format                                                                                                                        |
|         | uuid           | uuid v4 format                                                                                                                     |
| --email |                | generate string as email format.                                                                                                   |
|         | target         | you can specified a sibling's attribute as target so that a dynamic value in it's value field will be used as local-part of email. |
|         | target@domain  | can also specified domain.                                                                                                         |
| --name  |                | generate random first name string.                                                                                                 |
|         | full           | generate string as 'first last' format.                                                                                            |
| --unix  |                | generate unix timestamp from server current date.                                                                                  |
|         | offset(secs)   | specify offsets from server current date.                                                                                          |
| --iso   |                | generate string as iso8601 format from server current date.                                                                        |
|         | offset(secs)   | specify offsets from server current date.                                                                                          |
| --image |                | generate url for image with random background color.                                                                               |
|         | width:[height] | you can specify size of the image.                                                                                                 |
|         | path           | you can customize the output of images with specified path. see more details at images section below                               |
| --lorem |                | generate text.                                                                                                                     |
|         | len!           | generate text with fixed size(=len).                                                                                               |
|         | len            | text may not have its size len, but it will end with punctuation.                                                                  |
|         | min:max!       | generate text with random size in range min to max.                                                                                |
|         | min:max        | generate text with random size in range min to max, and it will end with punctuation.                                              |

#### META
this is kind of magic 🪄  
META offers object transformation.

META is an object where the transformation rules for siblings are written.  
it always have to use attribute named `__meta__`  

```json
{
  "__meta__": {
    "target": {
      "task": {
        "rule1": "...",
        "rule2": "..."
      }
    }
  }
}
```

"target" must be an existing sibling's attribute name.

| TASK | RULE  |                             |
|------|-------|-----------------------------|
| l    |       | transform target to array.  |
|      | count | how many items in the list. | 

at this time support OBJECT-TO-ARRAY conversion only...

### Images
the api offers image pages for generated images using transformer.   
and it also provides ways to customize images using path components.

it uses [echo.images](https://github.com/tom-e-kid/echo-images) internally to generate images.  
path components of image pages will map to the parameters of the request to the echo.images.

`HOST/images/[widht]/[height]?/[hex_background_border_text]?/[label]?.[format]?`

| COMPONENT |            | Optional  | NOTE                                                                                            |
|-----------|------------|-----------|-------------------------------------------------------------------------------------------------|
| width     |            | false     | image width                                                                                     |
| height    |            | true      | image height. use same value as width if unspecified.                                           |
| hex       |            | true      | RGB colors as hex string. specify to join color strings using under score and add prefix 'hex_' |
|           | background | true      | use 3 or 6 hexes like f00, ff0000                                                               |
|           | border     | true      | same as background                                                                              |
|           | text       | true      | same as background                                                                              |
| label     |            | true      |                                                                                                 |
| format    |            | true      | jpeg or png. use jpeg if unspecified                                                            | 

#### Examples
* https://echo-api-sigma.vercel.app/images/256.png
* https://echo-api-sigma.vercel.app/images/512/256.png
* https://echo-api-sigma.vercel.app/images/256/512/hex_0f0_f00_00f.png


## License
[MIT License](https://github.com/tom-e-kid/echo-api/blob/main/LICENSE)

## See also
[Echo.images](https://github.com/tom-e-kid/echo-images)
