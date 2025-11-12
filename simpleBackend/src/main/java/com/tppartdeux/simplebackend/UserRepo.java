package com.tppartdeux.simplebackend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository <UserModel,Integer> {

}
