1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans : getElementById  একটি নির্দিষ্ট ID ব্যবহার করে element খুঁজে বের করে।     getElementsByClassName  class name ব্যবহার করে element খোঁজে।      querySelector  CSS selector ব্যবহার করে element খুঁজে বের করে।    querySelectorAll   CSS selector ব্যবহার করে কিন্তু সব matching element return করে।


2. How do you create and insert a new element into the DOM?
Ans:   1st  createElement() method ব্যবহার করে একটি নতুন element তৈরি করতে হয়।  তারপর element-এর মধ্যে প্রয়োজনীয় attribute যোগ করা হয়। এরপর appendChild() method ব্যবহার করে সেই element-টি parent element-এর ভিতরে যোগ করা হয়।


3. What is Event Bubbling? And how does it work?
Ans:  যেখানে কোনো child element-এ event ঘটলে সেই event ধাপে ধাপে তার parent element, তারপর grandparent হয়ে উপরের দিকে যেতে থাকে document পর্যন্ত।

কোনো element-এ (যেমন button) click করা হয় তখন
eventটি ওই element-এ কাজ করে,
তারপর তার parent element-এ যায়,
এরপর আরও উপরের parent গুলোতে যায়,
এভাবে document পর্যন্ত পৌঁছায়।

4. What is Event Delegation in JavaScript? Why is it useful?
Ans:  Event Delegation হলো এমন একটি পদ্ধতি যেখানে child element-গুলোর জন্য আলাদা আলাদা event listener না দিয়ে তাদের common parent element-এ একটি listener বসানো হয়।
Why useful-
কম listener লাগে
memory কম লাগে
code সহজ হয়
dynamic element সহজে handle করা যায়।

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans:  preventDefault()
     এটি কোনো element-এর default behavior বন্ধ করে দেয়।
stopPropagation()
Event Bubbling বন্ধ করে দেয়।
   
