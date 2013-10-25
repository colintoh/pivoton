Pivoton
==============================
Adding a pivotal animation to your buttons.

**Demo page**: http://colintoh.github.io/pivoton/example/index.html

**Blog Post**:

----------------

Requirement:
----------------
\>= jQuery 1.10.1

------------------

Usage:
----------------

    //Start out with any button class you want.
    <div class="btn"></div>

    // Call $.pivoton on the element you want.
    $(function(){
        $('.btn').pivoton();
    });

The element which got pivoton-ed will have a additional element ```.pivoton-stage``` wrapped around the button. 8 overlay elements will also be prepended to ```.pivoton-stage```. These overlay elements will be in charge of detecting the click events.

Options:
----------------
    //Default Options
    $('someelement').pivoton({
        degree:30,
        easing: 'ease',
        speed: 0.3, //seconds
        perspective: 400,
        activeClass: 'active',
        debug: false
    });
```degree``` : The degree of the pivot.

```easing```: The animation of the pivot. Supports any CSS3 transition.

```speed (s)```: Pivot speed in seconds

```perspective```: The smaller the perspective, the crazier it gets.

```activeClass```: The class that will be added after clicking on the button.

```debug[true/false]```: Debugging the bug.

----------

Additional Settings
=============
If you add a ```data-id``` attribute to the button, pivoton convert it to a ```id``` and add it to the ```pivoton-stage``` wrapper. Check out the ```examples``` folder to see the implementation.