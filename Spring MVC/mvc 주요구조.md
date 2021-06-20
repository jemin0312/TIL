😃 개괄적인 MVC의 HTTP 요청 처리 구조 

- dispatcherServlet에서 http 요청을 받는다
- dispatcherServlet에서 gethandler 메서드를 통해 맞는 handler를 찾아온다.
- 찾아온 핸들러를 gethandlerAdapter 메서드에 매개변수로 집어넣는다.
- 어뎁터를 찾아온다. 어뎁터에서 handle 메서드를 실행한다.
- handle메서드 내부에서는 handler의 매개변수 형태를 보고 argumentresolver가 동작한다.
- 만약 responsebody나 httpentity의 형태라면 httpmessageconverter가 동작한다.
- 반환해줄때는 returnvaluehandler가 작동한다.
- 어떤 반환값이 나오든 형태를 일관되게 만들어 준다. 메시지 바디에 직접 실어보내야할때는
- httpmessageconverter 동작한다.

## dispatcherServlet

- front-controller servlet을 스프링 mvc에서 구현한 것이다.
- 스프링 mvc의 핵심 기술이다.
- httpservlet을 상속 받는다.
- 스프링 부트에서는 **자동**으로 dispatcherServlet을 등록하고 모든 경로에 대해서 적용된다. 즉 어떤 uri로 검색을 하던지 dispatcherServlet이 활성화 된다.
- 서블릿이 호출되면, dispatcherServlet의 부모인 frameworkServlet.service()가 호출되면서 결과적으로 가장 중요한 메서드인 dispatcherServlet.doDispatch() 가 호출된다.

## handlerMapping

- handlerMapping는 스프링빈에 등록된 클래스들 중에서 핸들러를 찾는다.
- 여러가지 handlermapping들을 돌아가면서 찾는다. 예를 들어 첫번재 mapping안되면 두번재 mapping 꺼내서 조사한다.
- 보통 1순위는 RequestMappinghandlerMapping이다. @Requestmapping 붙어있는 스프링빈 클래스를 찾는다. 2순위는 요청들어온 uri와 스프링빈 이름이 같은 요소를 찾는다.
- 그다음에는 handleradapter를 찾는다. 1순위는 @Requestmapping이나 @Controller가 붙은걸 찾는다. 2순위는 httprequesthandler를 구현한걸 찾는다. 3번째가 controller 인터페이스 구현한걸 찾는다.

## 뷰 리졸버

- 우선 핸들러의 메서드에서 modelAndView를 뱉어내면 어댑터는 다시 그 modelAndView를 어댑터 밖으로 반환한다. 프로세스를 짜는것이외에는 모두 자동으로 일어난다. 왜냐하면 어댑터와 dispatcherServlet은 모두 자동으로 구성이 되어있기 때문이다.
- 뷰 리졸버가 호출될때 1순위는 beanNameViewResolver인데 자신이 출시킬 뷰가 스프링빈에 뷰네임으로 등록되어있는지를 검색한다.
- 2순위로는 internalresouceviewresolver가 있고 jsp로 렌더링을 시켜주는 것이다.
