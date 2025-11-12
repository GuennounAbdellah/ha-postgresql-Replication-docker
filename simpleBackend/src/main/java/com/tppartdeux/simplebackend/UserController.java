package com.tppartdeux.simplebackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepo userRepo;
    
    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("users")
    public List<UserModel> getUser() {
        return userRepo.findAll();
    }

    @PostMapping("addUser")
    public UserModel postMethodName(@RequestBody UserDto user) {
        UserModel userModel = new UserModel();
        userModel.setName(user.getName());
        userModel.setAge(user.getAge());

        return userRepo.save(userModel);
    }
}